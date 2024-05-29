export const PhoneNumberNormalization = (phone: string) => {
  phone = String(phone).trim();
  if (phone.startsWith("+62")) {
    phone = "0" + phone.slice(3);
  } else if (phone.startsWith("62")) {
    phone = "0" + phone.slice(2);
  }

  return phone.replace(/[- .]/g, "").replace("e", "").replace(" ", "");
};

export const PhoneValidationCheck = (phone: string) => {
  if (!phone || !/^08[1-9][0-9]{7,10}$/.test(phone)) {
    return false;
  }
  return true;
};

export const CurrencyValidationCheck = (currency: string) => {
  if (String(currency).trim().startsWith("0")) {
    return false;
  }

  return true;
};
