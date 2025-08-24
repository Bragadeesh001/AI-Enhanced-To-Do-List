import React from 'react'

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-branding">
          <p>Powered by AI Technology</p>
        </div>

        <div className="footer-features">
          <div className="feature-item">
            <div className="feature-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 1L3 5V11C3 16.55 6.84 21.74 12 23C17.16 21.74 21 16.55 21 11V5L12 1ZM12 11.99H19C18.47 16.11 15.72 19.78 12 20.93V12H5V6.3L12 3.19V11.99Z" fill="#10B981"/>
              </svg>
            </div>
            <span>Secure</span>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M13 2.05V4.05C17.39 4.59 20.5 8.58 19.96 12.97C19.5 16.61 16.64 19.5 13 19.93V21.93C18.5 21.38 22.5 16.5 21.95 11C21.5 6.25 17.73 2.5 13 2.03V2.05ZM5.67 19.74C7.18 21.08 9.04 21.97 11 22V20C9.58 19.82 8.23 19.25 7.1 18.37L5.67 19.74ZM7.1 5.74C8.22 4.84 9.57 4.26 11 4.06V2.06C9.05 2.25 7.19 3.12 5.67 4.47L7.1 5.74ZM5.69 7.1L4.26 5.67C2.91 7.19 2.04 9.05 1.85 11H3.85C4.04 9.58 4.62 8.23 5.69 7.1ZM4.06 13H2.06C2.25 14.95 3.12 16.81 4.47 18.33L5.9 16.9C4.83 15.77 4.25 14.42 4.06 13ZM10 16.5L6.5 13L7.91 11.59L10 13.67L14.59 9.09L16 10.5L10 16.5Z" fill="#F59E0B"/>
              </svg>
            </div>
            <span>Fast</span>
          </div>

          <div className="feature-item">
            <div className="feature-icon">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21Z" fill="#6B46C1"/>
                <path d="M12 12C14.21 12 16 10.21 16 8C16 5.79 14.21 4 12 4C9.79 4 8 5.79 8 8C8 10.21 9.79 12 12 12ZM12 14C9.33 14 4 15.34 4 18V20H20V18C20 15.34 14.67 14 12 14Z" fill="#6B46C1"/>
              </svg>
            </div>
            <span>Smart</span>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
