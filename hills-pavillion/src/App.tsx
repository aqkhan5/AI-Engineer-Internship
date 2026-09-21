import { useNavigation } from './hooks/useNavigation';
import { ROUTES } from './lib/constants';
import { PublicLayout } from './layouts/PublicLayout';
import { PlatformLayout } from './layouts/PlatformLayout';

// Public Pages
import { HomePage } from './pages/public/HomePage';
import { ProjectsPage } from './pages/public/ProjectsPage';
import { ProjectDetailPage } from './pages/public/ProjectDetailPage';
import { PropertyDiscoveryPage } from './pages/public/PropertyDiscoveryPage';
import { ConstructionPage } from './pages/public/ConstructionPage';
import { AdvisoryPage } from './pages/public/AdvisoryPage';

// Platform Pages
import { DashboardPage } from './pages/platform/DashboardPage';
import { CrmLeadsPage } from './pages/platform/CrmLeadsPage';
import { InventoryPage } from './pages/platform/InventoryPage';
import { CommandCenterPage } from './pages/platform/CommandCenterPage';

export function App() {
  const { currentPath, navigate, isInternalPlatform } = useNavigation();

  // Route selector
  const renderContent = () => {
    switch (currentPath) {
      // Internal Platform Routes
      case ROUTES.PLATFORM_DASHBOARD:
        return <DashboardPage onNavigate={navigate} />;
      case ROUTES.PLATFORM_LEADS:
        return <CrmLeadsPage onNavigate={navigate} />;
      case ROUTES.PLATFORM_INVENTORY:
        return <InventoryPage onNavigate={navigate} />;
      case ROUTES.PLATFORM_COMMAND:
        return <CommandCenterPage onNavigate={navigate} />;

      // Public Routes
      case ROUTES.PROJECTS:
        return <ProjectsPage onNavigate={navigate} />;
      case ROUTES.PROJECT_DETAIL:
        return <ProjectDetailPage onNavigate={navigate} />;
      case ROUTES.DISCOVERY:
        return <PropertyDiscoveryPage onNavigate={navigate} />;
      case ROUTES.CONSTRUCTION:
        return <ConstructionPage onNavigate={navigate} />;
      case ROUTES.ADVISORY:
        return <AdvisoryPage onNavigate={navigate} />;
      case ROUTES.HOME:
      default:
        return <HomePage onNavigate={navigate} />;
    }
  };

  if (isInternalPlatform) {
    return (
      <PlatformLayout currentPath={currentPath} onNavigate={navigate}>
        {renderContent()}
      </PlatformLayout>
    );
  }

  return (
    <PublicLayout currentPath={currentPath} onNavigate={navigate}>
      {renderContent()}
    </PublicLayout>
  );
}

export default App;
