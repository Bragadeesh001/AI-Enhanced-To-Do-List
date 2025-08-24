import { useState } from 'react'
import './App.css'
import Header from './components/Header'
import TaskInput from './components/TaskInput'
import Statistics from './components/Statistics'
import TaskList from './components/TaskList'
import Footer from './components/Footer'
import Login from './components/Login'
import Signup from './components/Signup'
import ForgotPassword from './components/ForgotPassword'

function App() {
  const [authState, setAuthState] = useState('login') // 'login', 'signup', 'forgot-password', 'authenticated'
  const [user, setUser] = useState(null)

  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Buy groceries',
      description: 'Get essential food items like milk, bread, eggs, and fresh vegetables for the week.',
      completed: false,
      priority: 'high',
      aiEnhanced: true,
      createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    },
    {
      id: 2,
      title: 'Finish project report',
      description: 'Complete the quarterly analysis report with charts, data insights, and recommendations for Q1.',
      completed: true,
      priority: 'completed',
      aiEnhanced: true,
      createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    },
    {
      id: 3,
      title: 'Schedule dentist appointment',
      description: 'Book a routine dental checkup and cleaning appointment for next week.',
      completed: false,
      priority: 'medium',
      aiEnhanced: true,
      createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    }
  ])

  const [filter, setFilter] = useState('all')

  const addTask = (title) => {
    const newTask = {
      id: Date.now(),
      title,
      description: `AI enhanced description for: ${title}`,
      completed: false,
      priority: 'medium',
      aiEnhanced: true,
      createdAt: new Date()
    }
    setTasks([...tasks, newTask])
  }

  const toggleTask = (id) => {
    setTasks(tasks.map(task =>
      task.id === id
        ? { ...task, completed: !task.completed, priority: !task.completed ? 'completed' : 'medium' }
        : task
    ))
  }

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filter === 'all') return true
    if (filter === 'pending') return !task.completed
    if (filter === 'completed') return task.completed
    return true
  })

  const stats = {
    total: tasks.length,
    completed: tasks.filter(task => task.completed).length,
    pending: tasks.filter(task => !task.completed).length,
    aiEnhanced: tasks.filter(task => task.aiEnhanced).length
  }

  // Authentication handlers
  const handleLogin = (loginData) => {
    if (loginData.isGuest) {
      setUser({ name: 'Guest User', email: 'guest@example.com', isGuest: true })
    } else {
      setUser({ name: 'User', email: loginData.email })
    }
    setAuthState('authenticated')
  }

  const handleSignup = (signupData) => {
    setUser({
      name: `${signupData.firstName} ${signupData.lastName}`,
      email: signupData.email,
      preferences: signupData.aiPreferences
    })
    setAuthState('authenticated')
  }

  const handleLogout = () => {
    setUser(null)
    setAuthState('login')
  }

  const handleResetPassword = (email) => {
    // Handle password reset logic here
    console.log('Password reset requested for:', email)
    // In a real app, you would send an API request here
  }

  const switchToSignup = () => setAuthState('signup')
  const switchToLogin = () => setAuthState('login')
  const switchToForgotPassword = () => setAuthState('forgot-password')
  const switchBackToLogin = () => setAuthState('login')

    return (
    <div className="app">
      {authState === 'authenticated' ? (
        <>
          <Header user={user} onLogout={handleLogout} />
          <div className="main-content">
            <div className="banner">
              <h2>Smart To-Do Management</h2>
              <p>Let AI enhance your productivity by automatically prioritizing tasks and generating helpful summaries for better organization.</p>
            </div>

            <TaskInput onAddTask={addTask} />
            <Statistics stats={stats} />
            <TaskList
              tasks={filteredTasks}
              filter={filter}
              onFilterChange={setFilter}
              onToggleTask={toggleTask}
              onDeleteTask={deleteTask}
            />
          </div>
          <Footer />
        </>
      ) : authState === 'signup' ? (
        <Signup onSwitchToLogin={switchToLogin} onSignup={handleSignup} />
      ) : authState === 'forgot-password' ? (
        <ForgotPassword onBackToLogin={switchBackToLogin} onResetPassword={handleResetPassword} />
      ) : (
        <Login onSwitchToSignup={switchToSignup} onSwitchToForgotPassword={switchToForgotPassword} onLogin={handleLogin} />
      )}
    </div>
  )
}

export default App
