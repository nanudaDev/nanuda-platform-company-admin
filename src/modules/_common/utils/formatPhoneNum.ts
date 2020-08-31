export const formatPhoneNum = (phoneNum: string): string => {
  let phone = '';
  if (phoneNum.length < 4) {
    return phoneNum;
  } else if (phoneNum.length < 7) {
    phone += phoneNum.substr(0, 3);
    phone += '-';
    phone += phoneNum.substr(3);
  } else if (phoneNum.length < 11) {
    phone += phoneNum.substr(0, 3);
    phone += '-';
    phone += phoneNum.substr(3, 3);
    phone += '-';
    phone += phoneNum.substr(6);
  } else {
    phone += phoneNum.substr(0, 3);
    phone += '-';
    phone += phoneNum.substr(3, 4);
    phone += '-';
    phone += phoneNum.substr(7);
  }
  return phone;
};
