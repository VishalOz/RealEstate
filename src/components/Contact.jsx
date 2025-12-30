import React, { useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    alert('Thank you for your message! We will get back to you soon.');
    setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
  };

  const inputStyle = {
    width: '100%',
    padding: '15px 20px',
    border: '1px solid #e0e0e0',
    borderRadius: '12px',
    fontSize: '15px',
    fontFamily: '"Inter", sans-serif',
    transition: 'all 0.3s ease',
    outline: 'none',
    backgroundColor: '#fff'
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '14px',
    fontWeight: 500,
    color: '#1a1a1a',
    fontFamily: '"Inter", sans-serif'
  };

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5">
        <h1 style={{ 
          fontWeight: 400, 
          color: '#1a1a1a', 
          marginBottom: '15px',
          fontFamily: '"Inter", sans-serif'
        }}>
          Get In Touch
        </h1>
        <p style={{ 
          color: '#6b7280', 
          maxWidth: '500px', 
          margin: '0 auto',
          fontSize: '16px',
          lineHeight: 1.7
        }}>
          Have questions about a property or need assistance? We're here to help you find your perfect home.
        </p>
      </div>

      <div className="row g-5">
        {/* Contact Form */}
        <div className="col-lg-7">
          <div 
            className="p-4 p-md-5" 
            style={{ 
              backgroundColor: '#fff', 
              borderRadius: '20px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.05)'
            }}
          >
            <h3 style={{ 
              fontWeight: 600, 
              marginBottom: '25px', 
              color: '#1a1a1a',
              fontFamily: '"Inter", sans-serif'
            }}>
              Send us a Message
            </h3>
            
            <form onSubmit={handleSubmit}>
              <div className="row g-4">
                <div className="col-md-6">
                  <label style={labelStyle}>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Vishal Sudasinghe"
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#1a1a1a'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
                
                <div className="col-md-6">
                  <label style={labelStyle}>Email Address</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="oshadavishal123@gmail.com"
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#1a1a1a'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
                
                <div className="col-md-6">
                  <label style={labelStyle}>Phone Number</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+94 77 683 1413"
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#1a1a1a'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
                
                <div className="col-md-6">
                  <label style={labelStyle}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Property Inquiry"
                    required
                    style={inputStyle}
                    onFocus={(e) => e.target.style.borderColor = '#1a1a1a'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
                
                <div className="col-12">
                  <label style={labelStyle}>Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    required
                    rows="5"
                    style={{
                      ...inputStyle,
                      resize: 'none'
                    }}
                    onFocus={(e) => e.target.style.borderColor = '#1a1a1a'}
                    onBlur={(e) => e.target.style.borderColor = '#e0e0e0'}
                  />
                </div>
                
                <div className="col-12">
                  <button
                    type="submit"
                    className="d-flex align-items-center justify-content-center gap-2"
                    style={{
                      width: '100%',
                      padding: '16px 30px',
                      backgroundColor: '#1a1a1a',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '12px',
                      fontSize: '16px',
                      fontWeight: 500,
                      fontFamily: '"Inter", sans-serif',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease'
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#333';
                      e.target.style.transform = 'translateY(-2px)';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '#1a1a1a';
                      e.target.style.transform = 'translateY(0)';
                    }}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Contact Information */}
        <div className="col-lg-5">
          <div 
            className="p-4 p-md-5 h-100" 
            style={{ 
              background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%)',
              borderRadius: '20px',
              color: '#fff'
            }}
          >
            <h3 style={{ 
              fontWeight: 600, 
              marginBottom: '30px',
              fontFamily: '"Inter", sans-serif'
            }}>
              Contact Information
            </h3>
            
            <div className="d-flex flex-column gap-4">
              <div className="d-flex align-items-start gap-3">
                <div 
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <LocationOnIcon style={{ fontSize: 24 }} />
                </div>
                <div>
                  <h6 style={{ fontWeight: 600, marginBottom: '5px', fontFamily: '"Inter", sans-serif' }}>
                    Office Address
                  </h6>
                  <p style={{ color: '#a0a0a0', margin: 0, fontSize: '14px', lineHeight: 1.6 }}>
                    51/4 Aniyakanda road Nagoda, kandana<br />Sri Lanka
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3">
                <div 
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <EmailIcon style={{ fontSize: 24 }} />
                </div>
                <div>
                  <h6 style={{ fontWeight: 600, marginBottom: '5px', fontFamily: '"Inter", sans-serif' }}>
                    Email Us
                  </h6>
                  <p style={{ color: '#a0a0a0', margin: 0, fontSize: '14px' }}>
                    info@yourniwahana.lk<br />
                    support@yourniwahana.lk
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3">
                <div 
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <PhoneIcon style={{ fontSize: 24 }} />
                </div>
                <div>
                  <h6 style={{ fontWeight: 600, marginBottom: '5px', fontFamily: '"Inter", sans-serif' }}>
                    Call Us
                  </h6>
                  <p style={{ color: '#a0a0a0', margin: 0, fontSize: '14px' }}>
                    +94 11 234 5678<br />
                    +94 77 987 6543
                  </p>
                </div>
              </div>

              <div className="d-flex align-items-start gap-3">
                <div 
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0
                  }}
                >
                  <AccessTimeIcon style={{ fontSize: 24 }} />
                </div>
                <div>
                  <h6 style={{ fontWeight: 600, marginBottom: '5px', fontFamily: '"Inter", sans-serif' }}>
                    Working Hours
                  </h6>
                  <p style={{ color: '#a0a0a0', margin: 0, fontSize: '14px' }}>
                    Mon - Fri: 9:00 AM - 6:00 PM<br />
                    Sat: 10:00 AM - 4:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact
