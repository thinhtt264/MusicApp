export const otpFormat = (message: string) => {
  let otp: any = message.match(/[0-9]{4}/g);
  if (otp) {
    otp = otp[0];
  }
  return otp;
};
export const isNumber = (num: any): boolean => {
  return !isNaN(parseFloat(String(num)));
};

export const formatMoney = (number: number) => {
  return `${number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} đ`;
};
