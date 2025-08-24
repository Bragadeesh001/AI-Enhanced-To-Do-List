import React, { useState } from 'react'

const ForgotPassword = ({ onBackToLogin, onResetPassword }) => {
  const [email, setEmail] = useState('')
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState({})

  const handleEmailChange = (e) => {
    setEmail(e.target.value)
    if (errors.email) {
      setErrors(prev => ({ ...prev, email: '' }))
    }
  }

  const validateEmail = () => {
    if (!email) {
      setErrors({ email: 'Email is required' })
      return false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setErrors({ email: 'Please enter a valid email' })
      return false
    }
    return true
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (validateEmail()) {
      // Handle password reset logic here
      onResetPassword(email)
      setIsSubmitted(true)
    }
  }

  const handleBackToLogin = () => {
    onBackToLogin()
  }

  if (isSubmitted) {
    return (
      <div className="auth-container">
        <div className="auth-card">
          <div className="auth-header">
            <div className="auth-logo">
              <img src="/logo.png" alt="AI TaskMaster Logo" width="70" height="70" />
            </div>
            <h1>Check Your Email</h1>
            <p>We've sent a password reset link to {email}</p>
          </div>

          <div className="reset-success">
            <div className="success-icon">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM10 17L5 12L6.41 10.59L10 14.17L17.59 6.58L19 8L10 17Z" fill="#10B981"/>
              </svg>
            </div>
            <p className="success-message">
              If you don't see the email, check your spam folder or try again.
            </p>
          </div>

          <div className="auth-actions">
            <button type="button" className="auth-button" onClick={handleBackToLogin}>
              Back to Login
            </button>
          </div>

          <div className="auth-footer">
            <p>
              Didn't receive the email?{' '}
              <button type="button" className="link-button" onClick={() => setIsSubmitted(false)}>
                Try again
              </button>
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">
            <img src="/logo.png" alt="AI TaskMaster Logo" width="70" height="70" />
          </div>
          <h1>Forgot Password</h1>
          <p>Enter your email to reset your password</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className={errors.email ? 'error' : ''}
              placeholder="Enter your email address"
            />
            {errors.email && <span className="error-message">{errors.email}</span>}
          </div>

          <button type="submit" className="auth-button">
            Send Reset Link
          </button>
        </form>

        <div className="auth-actions">
          <button type="button" className="back-button" onClick={handleBackToLogin}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 11H7.83L13.42 5.41L12 4L4 12L12 20L13.41 18.59L7.83 13H20V11Z" fill="currentColor"/>
            </svg>
            Back to Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
