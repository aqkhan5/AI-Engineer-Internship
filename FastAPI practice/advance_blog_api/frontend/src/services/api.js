/**
 * INK & SIGNAL — API Service Client
 * Seamlessly connects React to the FastAPI backend with JWT Authentication
 */

const API_BASE = 'http://127.0.0.1:8000';

class ApiService {
  constructor() {
    this.tokenKey = 'ink_jwt_token';
    this.userKey = 'ink_user_data';
  }

  // Token & User Storage Helpers
  getToken() {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token) {
    if (token) {
      localStorage.setItem(this.tokenKey, token);
    }
  }

  getUser() {
    const raw = localStorage.getItem(this.userKey);
    try {
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  }

  setUser(user) {
    if (user) {
      localStorage.setItem(this.userKey, JSON.stringify(user));
    }
  }

  logout() {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.userKey);
  }

  isAuthenticated() {
    return Boolean(this.getToken());
  }

  // Generic Request Dispatcher
  async request(endpoint, options = {}) {
    const url = `${API_BASE}${endpoint}`;
    const headers = {
      'Content-Type': 'application/json',
      ...options.headers,
    };

    const token = this.getToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }

    try {
      const response = await fetch(url, {
        ...options,
        headers,
      });

      // Handle 401 Unauthorized (expired token)
      if (response.status === 401 && token) {
        this.logout();
      }

      const data = await response.json().catch(() => ({}));

      if (!response.ok) {
        const errorMsg = data?.detail || data?.message || `Request failed with status ${response.status}`;
        const error = new Error(typeof errorMsg === 'string' ? errorMsg : JSON.stringify(errorMsg));
        error.status = response.status;
        error.data = data;
        throw error;
      }

      return data;
    } catch (err) {
      if (err.name === 'TypeError' && err.message.includes('fetch')) {
        const connectionError = new Error('Cannot connect to FastAPI backend. Ensure uvicorn is running on port 8000.');
        connectionError.status = 0;
        throw connectionError;
      }
      throw err;
    }
  }

  // API Endpoints
  async checkHealth() {
    return this.request('/');
  }

  async signup({ username, email, password }) {
    return this.request('/signup', {
      method: 'POST',
      body: JSON.stringify({ username, email, password }),
    });
  }

  async login({ email, password }) {
    const data = await this.request('/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });

    if (data.access_token) {
      this.setToken(data.access_token);
      if (data.user) {
        this.setUser(data.user);
      }
    }
    return data;
  }

  async getPosts() {
    return this.request('/posts/');
  }

  async createPost({ title, content }) {
    return this.request('/posts/', {
      method: 'POST',
      body: JSON.stringify({ title, content }),
    });
  }

  async updatePost(postId, { title, content }) {
    return this.request(`/posts/${postId}`, {
      method: 'PUT',
      body: JSON.stringify({ title, content }),
    });
  }

  async deletePost(postId) {
    return this.request(`/posts/${postId}`, {
      method: 'DELETE',
    });
  }

  async getUsers() {
    return this.request('/user/');
  }
}

export const api = new ApiService();
export default api;
