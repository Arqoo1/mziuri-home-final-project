import { t } from 'i18next';

export const validateFullName = (value) => {
  if (!value) {
    return t('validation.fullNameRequired');
  } else if (!value.includes(' ')) {
    return t('validation.fullNameSpace');
  }
};

export const validateEmail = (value) => {
  if (!value) {
    return t('validation.emailRequired');
  } else if (!value.includes('@') || !value.includes('.')) {
    return t('validation.emailInvalid');
  }
};

export const validatePassword = (value) => {
  if (!value) {
    return t('validation.passwordRequired');
  } else if (value.length < 8) {
    return t('validation.passwordMinLength');
  }
};

export const validateConfirmPassword = (value) => {
  if (!value) {
    return t('validation.passwordRequired');
  } else if (value.length < 8) {
    return t('validation.passwordMinLength');
  }
};

export const validateSelect = (value, key = 'selectRequired') => {
  if (!value || value === '') {
    return t(`validation.${key}`);
  }
};
export const validateCheckbox = (value) => {
  if (!value) {
    return t('validation.checkboxRequired');
  }
};

export const validateMessage = (value) => {
  if (!value || value.trim() === '') {
    return t('validation.messageRequired');
  } else if (value.length < 10) {
    return t('validation.messageMinLength');
  }
  return null;
};
