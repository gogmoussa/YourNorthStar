import { useState, useEffect } from 'react'
import { useLocalStorage } from './storage/useLocalStorage'
import { STORAGE_KEYS } from './storage/storageKeys'
import { Dashboard } from './features/Dashboard/Dashboard'
import { Planner } from './features/Planning/Planner'
import { DailyLog } from './features/Daily/DailyLog'
import { Settings } from './features/Settings/Settings'
import { BottomNav } from './components/BottomNav'
import { SidebarNav } from './components/SidebarNav'

function App() {
  const [activeView, setActiveView] = useState('dashboard');
  const [isMobile, setIsMobile] = useState(window.innerWidth < 1024);
  const [vision] = useLocalStorage(STORAGE_KEYS.VISION, { longText: '', sentence: '' });

  // Onboarding Check: If no vision, force Settings/Vision flow
  useEffect(() => {
    // Only redirect if "onboarding" isn't done
    // Simple check: is vision empty?
    const hasVision = vision && (vision.longText || vision.sentence);
    if (!hasVision && activeView !== 'settings') {
      // We could have a dedicated "Welcome" component, 
      // but redirecting to Settings with a toast/message is easier for MVP.
      setActiveView('settings');
      // Ideally we'd show a "Welcome! Let's define your vision first" message here.
    }
  }, [vision, activeView]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const renderView = () => {
    switch (activeView) {
      case 'dashboard': return <Dashboard />;
      case 'planner': return <Planner />;
      case 'daily': return <DailyLog />;
      case 'settings': return <Settings />;
      default: return <Dashboard />;
    }
  };

  return (
    <div className="container">
      <main className="main-grid fade-in">
        {!isMobile && (
          <SidebarNav activeView={activeView} onViewChange={setActiveView} />
        )}

        <div className="content-col view-transition" key={activeView}>
          {activeView === 'settings' && (!vision.longText && !vision.sentence) && (
            <div style={{
              background: 'var(--color-accent)',
              color: 'white',
              padding: 'var(--space-md)',
              borderRadius: 'var(--radius-sm)',
              marginBottom: 'var(--space-lg)',
              textAlign: 'center'
            }}>
              <strong>Welcome to Your North Star.</strong><br />
              Let's start by defining where you want to go.
            </div>
          )}
          {renderView()}
        </div>
      </main>

      {isMobile && (
        <BottomNav activeView={activeView} onViewChange={setActiveView} />
      )}
    </div>
  )
}

export default App
