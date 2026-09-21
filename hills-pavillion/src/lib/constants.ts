export const ROUTES = {
  // Public Experience
  HOME: '/',
  PROJECTS: '/projects',
  PROJECT_DETAIL: '/projects/the-lacustrine-pavilions',
  DISCOVERY: '/discovery',
  CONSTRUCTION: '/construction',
  ADVISORY: '/advisory',

  // Internal Platform Experience
  PLATFORM_DASHBOARD: '/platform',
  PLATFORM_LEADS: '/platform/leads',
  PLATFORM_INVENTORY: '/platform/inventory',
  PLATFORM_COMMAND: '/platform/command',
} as const;

export type RoutePath = typeof ROUTES[keyof typeof ROUTES] | string;

export interface NavLink {
  label: string;
  path: RoutePath;
  badge?: string;
}

export const PUBLIC_NAV_LINKS: NavLink[] = [
  { label: 'Overview', path: ROUTES.HOME },
  { label: 'Projects', path: ROUTES.PROJECTS },
  { label: 'The Lacustrine Pavilions', path: ROUTES.PROJECT_DETAIL },
  { label: 'Discovery', path: ROUTES.DISCOVERY },
  { label: 'Construction', path: ROUTES.CONSTRUCTION },
  { label: 'Advisory', path: ROUTES.ADVISORY },
];

export const PLATFORM_NAV_LINKS = {
  core: [
    { label: 'Dashboard', path: ROUTES.PLATFORM_DASHBOARD, icon: 'dashboard' },
    { label: 'Leads Desk', path: ROUTES.PLATFORM_LEADS, icon: 'group', badge: '3 SLA' },
    { label: 'Spatial Inventory', path: ROUTES.PLATFORM_INVENTORY, icon: 'grid_view' },
  ],
  intelligence: [
    { label: 'AI Command Center', path: ROUTES.PLATFORM_COMMAND, icon: 'psychology', badge: 'v3.2' },
  ]
};
