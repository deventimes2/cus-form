import React, { useState, useEffect } from 'react';

function CustomerForm() {
  const [formData, setFormData] = useState({
    name: '',
    mobile: '',
    gender: '',
    maritalStatus: ''
  });
  
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState('');
  const [isSubmittable, setIsSubmittable] = useState(true);

  useEffect(() => {
    // Handle marital status messages
    if (formData.maritalStatus === 'single') {
      setMessage('This policy is not applicable for single customers.');
      setMessageType('error');
    } else if (formData.maritalStatus === 'married') {
      setMessage('Thank you! We will call you back soon.');
      setMessageType('success');
    } else {
      setMessage('');
      setMessageType('');
    }
  }, [formData.maritalStatus]);

  useEffect(() => {
    // Disable submit if gender is 'other'
    setIsSubmittable(formData.gender !== 'other');
  }, [formData.gender]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Form submitted successfully!');
    // Add your form submission logic here
  };

  return (
    <div style={{ maxWidth: '500px', margin: '20px auto', padding: '20px' }}>
      <h2>Customer Information Form</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '15px' }}>
          <label>Full Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Mobile Number:</label>
          <input
            type="tel"
            name="mobile"
            pattern="[0-9]{10}"
            value={formData.mobile}
            onChange={handleInputChange}
            required
            style={{ width: '100%', padding: '8px' }}
          />
          <small>Format: 10-digit number</small>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Gender:</label>
          <div>
            <label>
              <input
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleInputChange}
                required
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleInputChange}
              />
              Female
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="other"
                checked={formData.gender === 'other'}
                onChange={handleInputChange}
              />
              Other
            </label>
          </div>
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Marital Status:</label>
          <div>
            <label>
              <input
                type="radio"
                name="maritalStatus"
                value="single"
                checked={formData.maritalStatus === 'single'}
                onChange={handleInputChange}
                required
              />
              Single
            </label>
            <label>
              <input
                type="radio"
                name="maritalStatus"
                value="married"
                checked={formData.maritalStatus === 'married'}
                onChange={handleInputChange}
              />
              Married
            </label>
          </div>
        </div>

        {message && (
          <div style={{
            padding: '10px',
            marginTop: '10px',
            backgroundColor: messageType === 'error' ? '#ffdddd' : '#ddffdd',
            color: messageType === 'error' ? '#ff0000' : '#008000'
          }}>
            {message}
          </div>
        )}

        <button
          type="submit"
          disabled={!isSubmittable}
          style={{
            backgroundColor: isSubmittable ? '#4CAF50' : '#cccccc',
            color: 'white',
            padding: '10px 20px',
            border: 'none',
            borderRadius: '4px',
            cursor: isSubmittable ? 'pointer' : 'not-allowed'
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default CustomerForm;