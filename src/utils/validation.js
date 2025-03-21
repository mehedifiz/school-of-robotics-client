export const isValidBangladeshiPhone = (phone) => {
  const phoneRegex = /^(?:\+88|88)?(01[3-9]\d{8})$/;
  return phoneRegex.test(phone);
};