import { useState, useEffect } from 'react';
import { ROUTES, type RoutePath } from '../lib/constants';

export function useNavigation() {
  const [currentPath, setCurrentPath] = useState<RoutePath>(() => {
    if (typeof window !== 'undefined') {
      return window.location.hash ? (window.location.hash.slice(1) as RoutePath) : ROUTES.HOME;
    }
    return ROUTES.HOME;
  });

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      setCurrentPath(hash ? (hash as RoutePath) : ROUTES.HOME);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigate = (path: RoutePath) => {
    window.location.hash = path;
    setCurrentPath(path);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const isInternalPlatform = currentPath.startsWith('/platform');

  return {
    currentPath,
    navigate,
    isInternalPlatform,
  };
}
