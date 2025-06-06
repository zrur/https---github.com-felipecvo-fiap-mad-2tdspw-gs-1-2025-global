export const validators = {
  email(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  },

  password(password) {
    return password && password.length >= 6;
  },

  required(value) {
    return value !== null && value !== undefined && value.toString().trim() !== '';
  },

  numeric(value) {
    return !isNaN(value) && !isNaN(parseFloat(value));
  },

  positiveNumber(value) {
    const num = parseFloat(value);
    return !isNaN(num) && num > 0;
  },

  zoneName(name) {
    return this.required(name) && name.length >= 2 && name.length <= 50;
  },
};
