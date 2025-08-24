import React, { useState } from 'react'

const TaskInput = ({ onAddTask }) => {
  const [taskTitle, setTaskTitle] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (taskTitle.trim()) {
      onAddTask(taskTitle.trim())
      setTaskTitle('')
    }
  }

  return (
    <div className="task-input-card">
      <div className="task-input-header">
        <div className="task-input-icon">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z" fill="white"/>
          </svg>
        </div>
        <h3>Add New Task</h3>
      </div>

      <form onSubmit={handleSubmit} className="task-input-form">
        <div className="input-group">
          <input
            type="text"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
            placeholder="Enter your task (e.g., buy groceries)"
            className="task-input"
          />
          <button type="submit" className="add-task-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3 17.25V21H6.75L17.81 9.94L14.06 6.19L3 17.25ZM20.71 7.04C21.1 6.65 21.1 6.02 20.71 5.63L18.37 3.29C17.98 2.9 17.35 2.9 16.96 3.29L15.13 5.12L18.88 8.87L20.71 7.04Z" fill="white"/>
            </svg>
            Add Task
          </button>
        </div>

        <div className="ai-note">
          <div className="ai-note-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z" fill="#F59E0B"/>
            </svg>
          </div>
          <span>AI will automatically generate helpful summaries and priorities for your tasks</span>
        </div>
      </form>
    </div>
  )
}

export default TaskInput
