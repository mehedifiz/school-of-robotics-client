export const isValidBangladeshiPhone = (phone) => {
  // Regex for Bangladeshi numbers (starts with 01, followed by 9 digits)
  const bdPhoneRegex = /^01[3-9]\d{8}$/;
  return bdPhoneRegex.test(phone);
};