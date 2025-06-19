import { useState, useEffect, useRef } from 'react';
import './Lading.css'

function Landing() {

  const [mobileMenuActive, setMobileMenuActive] = useState(false);
  const [activeFAQs, setActiveFAQs] = useState(new Set());
  const [particles, setParticles] = useState([]);
  const [matrixColumns, setMatrixColumns] = useState([]);
  const particlesRef = useRef(null);
  const matrixRef = useRef(null);

  const toggleMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
  };

  // Close mobile menu when clicking outside or scrolling
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (mobileMenuActive && !e.target.closest('.mobile-menu') && !e.target.closest('.mobile-menu-icon')) {
        setMobileMenuActive(false);
      }
    };

    const handleScroll = () => {
      if (mobileMenuActive) {
        setMobileMenuActive(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('scroll', handleScroll);

    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [mobileMenuActive]);

  const toggleFAQ = (index: any) => {
    const newActiveFAQs = new Set(activeFAQs);
    if (newActiveFAQs.has(index)) {
      newActiveFAQs.delete(index);
    } else {
      newActiveFAQs.add(index);
    }
    setActiveFAQs(newActiveFAQs);
  };

  // Floating particles effect
  useEffect(() => {
    const particleInterval = setInterval(() => {
      const newParticle = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        animationDelay: Math.random() * 15,
        animationDuration: Math.random() * 10 + 10,
        size: Math.random() * 3 + 1
      };
      
      setParticles(prev => [...prev, newParticle]);
      
      // Remove particle after animation
      setTimeout(() => {
        setParticles(prev => prev.filter(p => p.id !== newParticle.id));
      }, 20000);
    }, 300);

    return () => clearInterval(particleInterval);
  }, []);

  // Matrix rain effect
  useEffect(() => {
    const matrixInterval = setInterval(() => {
      const matrixChars = '01アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
      const column = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        animationDelay: Math.random() * 5,
        animationDuration: Math.random() * 5 + 5,
        text: Array(20).fill(null).map(() => 
          matrixChars[Math.floor(Math.random() * matrixChars.length)]
        ).join('')
      };
      
      setMatrixColumns(prev => [...prev, column]);
      
      // Remove column after animation
      setTimeout(() => {
        setMatrixColumns(prev => prev.filter(c => c.id !== column.id));
      }, 10000);
    }, 200);

    return () => clearInterval(matrixInterval);
  }, []);

  // Smooth scrolling for anchor links
  const scrollToSection = (targetId) => {
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      const yOffset = -100;
      const y = targetElement.getBoundingClientRect().top + window.pageYOffset + yOffset;
      
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleSmoothScroll = (e) => {
      const href = e.currentTarget.getAttribute('href');
      if (href && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        
        if (mobileMenuActive) {
          setMobileMenuActive(false);
          setTimeout(() => scrollToSection(targetId), 200);
        } else {
          scrollToSection(targetId);
        }
      }
    };

    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
      link.addEventListener('click', handleSmoothScroll);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleSmoothScroll);
      });
    };
  }, [mobileMenuActive]);

  // Intersection Observer for fade-in animations
  useEffect(() => {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.animation = 'fadeInUp 0.6s ease-out forwards';
        }
      });
    }, observerOptions);

    const elements = document.querySelectorAll('.stat-card, .feature-card, .testimonial-card, .pricing-card');
    elements.forEach(el => observer.observe(el));

    return () => {
      elements.forEach(el => observer.unobserve(el));
    };
  }, []);

  const faqItems = [
    {
      question: "Why is it only £75? What's the catch?",
      answer: "No catch! We believe quality cybersecurity education should be accessible. For £75, you get the same technology that creates personalized learning paths worth thousands of pounds in traditional bootcamps. We've automated the personalization process, eliminated overhead costs, and pass the savings to you. One payment, lifetime access, no upsells."
    },
    {
      question: "How is this different from other cybersecurity courses?",
      answer: "Cyguides uses intelligent algorithms to create a completely personalized learning path based on your current skills, experience, and goals. Unlike one-size-fits-all courses, we skip what you already know and focus on filling your specific skill gaps. Plus, our system recommends the perfect labs from 30+ platforms, matching them to your exact learning needs."
    },
    {
      question: "Do I need prior experience in cybersecurity?",
      answer: "No! Our system adapts to any experience level. Whether you're completely new to IT or transitioning from another tech role, the platform creates a custom path for you. We have successful students from all backgrounds - teachers, accountants, military veterans, and more."
    },
    {
      question: "How long does it take to complete the program?",
      answer: "It depends on your goals, current skills, and time commitment. Most students dedicating 15-20 hours per week complete their program in 3-6 months. The system adjusts timelines based on your availability - from intensive 90-day sprints to flexible year-long programs."
    },
    {
      question: "What certifications does this prepare me for?",
      answer: "Depending on your chosen path, we prepare you for certifications like Security+, CySA+, OSCP, CEH, CISSP, AWS Security, and many more. We recommend certifications based on your target role and experience level, ensuring you pursue the most valuable ones for your career."
    },
    {
      question: "Do I get lifetime access with my payment?",
      answer: "Yes! With your one-time payment of £75, you get lifetime access to our platform. This includes all future updates, new features, and expanded content. No subscriptions, no recurring fees - just a single payment for unlimited access."
    }
  ];

  return (
    <div className="cyguides-landing">
      <div className="particles" ref={particlesRef}>
        {particles.map(particle => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}%`,
              animationDelay: `${particle.animationDelay}s`,
              animationDuration: `${particle.animationDuration}s`,
              width: `${particle.size}px`,
              height: `${particle.size}px`
            }}
          />
        ))}
      </div>

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
            
            {/* Shield icon - simple and clean */}
            <g transform="translate(15, 30)">
              <path d="M0 -15 L15 -10 L15 5 Q15 15 0 20 Q-15 15 -15 5 L-15 -10 Z" 
                    fill="url(#logoGradient)" 
                    filter="url(#glow)"/>
              <path d="M0 -5 L0 8 M-7 2 L7 2" 
                    stroke="#000000" 
                    strokeWidth="2.5" 
                    strokeLinecap="round"/>
            </g>
            
            {/* Professional typography */}
            <text x="45" y="35" fontSize="32" fontWeight="700" fill="#ffffff" fontFamily="Arial, sans-serif">
              CY<tspan fill="url(#logoGradient)">GUIDES</tspan>
            </text>
            
            {/* Subtle accent line */}
            <rect x="45" y="42" width="140" height="2" fill="url(#logoGradient)" opacity="0.5"/>
          </svg>
          
          <div className="nav-links">
            <a href="#features">Features</a>
            <a href="#testimonials">Success Stories</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
            <a href="#pricing" className="cta-button">Get Access - £75</a>
          </div>
          
          <div className="mobile-menu-icon" onClick={toggleMobileMenu}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </nav>
      
      <div className={`mobile-menu ${mobileMenuActive ? 'active' : ''}`}>
        <a href="#features" onClick={() => setMobileMenuActive(false)}>Features</a>
        <a href="#testimonials" onClick={() => setMobileMenuActive(false)}>Success Stories</a>
        <a href="#pricing" onClick={() => setMobileMenuActive(false)}>Pricing</a>
        <a href="#faq" onClick={() => setMobileMenuActive(false)}>FAQ</a>
        <a href="#pricing" className="cta-button" onClick={() => setMobileMenuActive(false)}>Get Access - £75</a>
      </div>

      <section className="hero">
        <div className="matrix-rain" ref={matrixRef}>
          {matrixColumns.map(column => (
            <div
              key={column.id}
              className="matrix-column"
              style={{
                left: `${column.left}%`,
                animationDelay: `${column.animationDelay}s`,
                animationDuration: `${column.animationDuration}s`
              }}
            >
              {column.text}
            </div>
          ))}
        </div>
        <div className="hero-content">
          <h1>Your <span className="glitch">Cybersecurity</span> Career Path Starts Here</h1>
          <div className="typing-container">
            <p className="typing-text">Skip the fluff. Learn only what YOU need. Get job-ready.</p>
          </div>
          <div className="hero-buttons">
            <a href="#pricing" className="primary-button">Get Started - Only £75</a>
            <a href="#demo" className="secondary-button">Watch Demo</a>
          </div>
        </div>
      </section>

      <section className="stats">
        <div className="stats-container">
          <div className="stat-card">
            <div className="stat-number">87%</div>
            <div className="stat-label">Job Placement Rate</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">3500+</div>
            <div className="stat-label">Students Trained</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">£75</div>
            <div className="stat-label">vs £1000s for Bootcamps</div>
          </div>
          <div className="stat-card">
            <div className="stat-number">500+</div>
            <div className="stat-label">Personalized Lab Recommendations</div>
          </div>
        </div>
      </section>

      <section id="features" className="features">
        <h2>Why Cyguides?</h2>
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Goal-Oriented Learning</h3>
            <p>Define your cybersecurity career goal and get a custom roadmap tailored to your target role - SOC Analyst, Penetration Tester, or Security Engineer.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Learn What Matters</h3>
            <p>Our intelligent system creates a personalized curriculum that skips what you already know and focuses on filling your specific skill gaps.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🚀</div>
            <h3>Start Your Journey</h3>
            <p>Begin immediately with curated labs from TryHackMe, HackTheBox, and 30+ platforms. Many labs are completely FREE!</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🛠️</div>
            <h3>Build Real Skills</h3>
            <p>Practice with hands-on labs, mock interviews, and real-world scenarios that employers actually care about.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Track Progress</h3>
            <p>Gamified learning with XP points, skill levels, and streaks. Visualize your journey from beginner to job-ready professional.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">👥</div>
            <h3>Community Support</h3>
            <p>Join study groups, find learning buddies, and participate in weekly challenges with other cybersecurity aspirants.</p>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials">
        <h2>Success Stories</h2>
        <div className="testimonials-grid">
          <div className="testimonial-card">
            <p className="testimonial-text">"From IT support to SOC Analyst in just 3 months! The system knew exactly what I needed to learn and didn't waste my time on basics I already knew."</p>
            <div className="testimonial-author">
              <div className="author-avatar">MJ</div>
              <div className="author-info">
                <h4>Michael Johnson</h4>
                <p>SOC Analyst at Fortune 500</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"The recommended labs were perfectly matched to my skill level. No more wasting time searching - the platform knew exactly what I needed! Landed my dream pentesting job."</p>
            <div className="testimonial-author">
              <div className="author-avatar">SC</div>
              <div className="author-info">
                <h4>Sarah Chen</h4>
                <p>Penetration Tester at Tech Startup</p>
              </div>
            </div>
          </div>
          <div className="testimonial-card">
            <p className="testimonial-text">"The mock interview feature was a game-changer. I walked into my interviews confident and prepared. Now earning $120K as a Security Engineer!"</p>
            <div className="testimonial-author">
              <div className="author-avatar">AP</div>
              <div className="author-info">
                <h4>Alex Patel</h4>
                <p>Security Engineer at FAANG</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="pricing" className="pricing">
        <h2>Simple, Transparent Pricing</h2>
        <p className="pricing-subtitle">No subscriptions. No upsells. Just one payment for everything.</p>
        <div className="pricing-container">
          <div className="pricing-card">
            <h3>Full Access</h3>
            <div className="price">£75</div>
            <div className="price-period">one-time payment</div>
            <ul className="pricing-features">
              <li>Personalized roadmap generation</li>
              <li>500+ lab recommendations from 30+ platforms</li>
              <li>Unlimited mock interviews with feedback</li>
              <li>Progress tracking & gamification</li>
              <li>Community access & study groups</li>
              <li>Interview question database</li>
              <li>Certification guidance</li>
              <li>Downloadable roadmap</li>
              <li>Lifetime updates</li>
            </ul>
            <a href="#" className="pricing-cta">Get Instant Access</a>
          </div>
          <div className="guarantee">
            <div className="guarantee-features">
              <span>✓ No subscriptions</span>
              <span>✓ No hidden fees</span>
              <span>✓ Lifetime access</span>
            </div>
          </div>
        </div>
      </section>

      <section id="faq" className="faq">
        <h2>Frequently Asked Questions</h2>
        <div className="faq-container">
          {faqItems.map((item, index) => (
            <div key={index} className={`faq-item ${activeFAQs.has(index) ? 'active' : ''}`}>
              <div className="faq-question" onClick={() => toggleFAQ(index)}>
                <span>{item.question}</span>
                <span className="faq-icon">+</span>
              </div>
              <div className="faq-answer">
                <p>{item.answer}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2>Ready to Start Your Cybersecurity Career?</h2>
        <p>Join 3,500+ students who've transformed their careers. Just £75 for lifetime access.</p>
        <a href="#" className="primary-button">Get Started for £75</a>
      </section>

      <footer>
        <p>&copy; 2025 Cyguides. Accelerate your cybersecurity career with personalized training.</p>
      </footer>
    </div>
  );
}

export default Landing
