export const validateFullName = (value) => {
  if (!value) {
    return 'Full name is required';
  } else if (!value.includes(' ')) {
    return 'Full name must contain at least one space';
  }
};

export const validateEmail = (value) => {
  if (!value) {
    return 'Email is required';
  } else if (!value.includes('@') || !value.includes('.')) {
    return 'Email is invalid';
  }
};

export const validatePassword = (value) => {
  if (!value) {
    return 'Password is required';
  } else if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }
};

export const validateConfirmPassword = (value) => {
  if (!value) {
    return 'Password is required';
  } else if (value.length < 8) {
    return 'Password must be at least 8 characters';
  }
};

export const validateSelect = (value) => {
  if (!value || value === '') {
    return 'This field is required';
  }
};

export const validateCheckbox = (value) => {
  if (!value) {
    return 'You must accept terms and conditions';
  }
};
export const validateMessage = (value) => {
  if (!value || value.trim() === '') {
    return 'Message is required';
  } else if (value.length < 10) {
    return 'Message must be at least 10 characters';
  }
  return null;
};
