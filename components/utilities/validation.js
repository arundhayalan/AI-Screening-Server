// utilities/validation.js

const validateUserData = (userData) => {
    const { email, password, name, country, state, phonenumber, address } = userData;
    const errors = {};
  
    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      errors.email = 'Invalid email address';
    }
  
    // Password validation
    if (!password || password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }
  
    // Name validation
    if (!name || name.trim() === '') {
      errors.name = 'Name is required';
    }
  
    // Country validation
    if (!country || country.trim() === '') {
      errors.country = 'Country is required';
    }
  
    // State validation
    if (!state || state.trim() === '') {
      errors.state = 'State is required';
    }
  
    // Phone number validation
    const phoneRegex = /^[0-9]{10}$/;
    if (!phonenumber || !phoneRegex.test(phonenumber)) {
      errors.phonenumber = 'Invalid phone number';
    }
  
    // Address validation
    if (!address || address.trim() === '') {
      errors.address = 'Address is required';
    }
  
    return { isValid: Object.keys(errors).length === 0, errors };
  };
  
  module.exports = validateUserData;
  