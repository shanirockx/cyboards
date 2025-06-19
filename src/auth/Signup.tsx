import { useState } from 'react';
import './Singup.css';

function Signup() {

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreeToTerms: false
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleInputChange = (e: any) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = () => {
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  return (
    <div className="cyguides-signup">
      <nav>
        <div className="container">
          <svg className="logo" viewBox="0 0 220 60" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" style={{stopColor:'#00ff88',stopOpacity:1}} />
                <stop offset="100%" style={{stopColor:'#00ffff',stopOpacity:1}} />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            <g transform="translate(15, 30)">
              <path d="M0 -15 L15 -10 L15 5 Q15 15 0 20 Q-15 15 -15 5 L-15 -10 Z" 
                    fill="url(#logoGradient)" 
                    filter="url(#glow)"/>
              <path d="M0 -5 L0 8 M-7 2 L7 2" 
                    stroke="#000000" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"/>
            </g>
            
            <text x="45" y="35" fontSize="32" fontWeight="700" fill="#ffffff" fontFamily="Arial, sans-serif">
              CY<tspan fill="url(#logoGradient)">GUIDES</tspan>
            </text>
            
            <rect x="45" y="42" width="140" height="2" fill="url(#logoGradient)" opacity="0.5"/>
          </svg>
          
          <div className="nav-links">
            <a href="/">Home</a>
            <a href="/signin" className="signin-link">Sign In</a>
          </div>
        </div>
      </nav>

      <div className="main-content">
        <div className="signup-container">
          <div className="signup-header">
            <h1 className="signup-title">Create Your Account</h1>
            <p className="signup-subtitle">Join 3,500+ Cybersecurity Professionals</p>
          </div>

          <div className="form-grid">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  placeholder="John"
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="email">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="john.doe@example.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                name="password"
                value={formData.password}
                onChange={handleInputChange}
                placeholder="••••••••"
              />
              <span 
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? 'Hide' : 'Show'}
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type={showConfirmPassword ? "text" : "password"}
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                placeholder="••••••••"
              />
              <span 
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? 'Hide' : 'Show'}
              </span>
            </div>
          </div>

          <div className="checkbox-group">
            <label className="checkbox-wrapper">
              <input
                type="checkbox"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleInputChange}
              />
              <span className="checkbox-custom"></span>
            </label>
            <span className="checkbox-label">
              I agree to the <a href="/terms">Terms of Service</a> and{' '}
              <a href="/privacy">Privacy Policy</a>
            </span>
          </div>

          <button 
            className="submit-button" 
            onClick={handleSubmit}
            disabled={!formData.agreeToTerms}
          >
            Create Free Account
          </button>

          <div className="signin-prompt">
            Already have an account? <a href="/signin">Sign In</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup
