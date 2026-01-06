import { VisionEditor } from './features/Vision/VisionEditor'
import { FocusEditor } from './features/Focus/FocusEditor'
import { WeeklyView } from './features/Weekly/WeeklyView'
import { DailyLog } from './features/Daily/DailyLog'
import { Settings } from './features/Settings/Settings'
import { ProgressSidebar } from './features/Progress/ProgressSidebar'

function App() {
  return (
    <div className="container">
      <header style={{ marginBottom: 'var(--space-xxl)', marginTop: 'var(--space-xl)', textAlign: 'center' }}>
        <h1 style={{ fontSize: 'var(--text-3xl)', fontWeight: '600' }}>Your North Star</h1>
        <p style={{ color: 'var(--color-text-secondary)', marginTop: 'var(--space-sm)' }}>
          A calm system to help you define direction.
        </p>
      </header>
      <main className="main-grid fade-in">
        <div className="content-col">
          <VisionEditor />
          <FocusEditor />
          <WeeklyView />
          <DailyLog />
          <Settings />
        </div>
        <ProgressSidebar />
      </main>
    </div>
  )
}

export default App
