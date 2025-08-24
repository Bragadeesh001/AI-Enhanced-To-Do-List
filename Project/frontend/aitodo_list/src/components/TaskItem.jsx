import React, { useState } from 'react'

const TaskItem = ({ task, timeAgo, onToggle, onDelete }) => {
  const [showMenu, setShowMenu] = useState(false)

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return '#EF4444'
      case 'medium':
        return '#F59E0B'
      case 'completed':
        return '#10B981'
      default:
        return '#6B7280'
    }
  }

  const getPriorityText = (priority) => {
    switch (priority) {
      case 'high':
        return 'High Priority'
      case 'medium':
        return 'Medium Priority'
      case 'completed':
        return 'Completed'
      default:
        return 'Low Priority'
    }
  }

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <div className="task-checkbox">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
          className="checkbox"
        />
        <div className="checkbox-custom">
          {task.completed && (
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.17L4.83 12L3.41 13.41L9 19L21 7L19.59 5.59L9 16.17Z" fill="white"/>
            </svg>
          )}
        </div>
      </div>

      <div className="task-content">
        <div className="task-title">{task.title}</div>
        <div className="task-description">{task.description}</div>
        <div className="task-meta">
          {task.aiEnhanced && (
            <div className="ai-badge">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z" fill="#6B46C1"/>
              </svg>
              AI Enhanced
            </div>
          )}
          <span className="task-time">
            {task.completed ? 'Completed' : 'Added'} {timeAgo}
          </span>
        </div>
      </div>

      <div className="task-actions">
        <div className="priority-badge" style={{ backgroundColor: getPriorityColor(task.priority) }}>
          {getPriorityText(task.priority)}
        </div>

        <div className="task-menu">
          <button
            className="menu-button"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z" fill="#6B7280"/>
            </svg>
          </button>

          {showMenu && (
            <div className="menu-dropdown">
              <button
                className="menu-item"
                onClick={() => {
                  onToggle(task.id)
                  setShowMenu(false)
                }}
              >
                {task.completed ? 'Mark as Pending' : 'Mark as Completed'}
              </button>
              <button
                className="menu-item delete"
                onClick={() => {
                  onDelete(task.id)
                  setShowMenu(false)
                }}
              >
                Delete Task
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default TaskItem
