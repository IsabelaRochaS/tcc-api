import { PhoneNumberUtil } from "google-libphonenumber";

export const maskSensitive = (value: string) => {
  if (value.match(/^\+\d+/)) {
    return maskPhoneNumber(value);
  }
  if (value.length > 7) {
    return (
      value.slice(0, 2) +
      "*".repeat(value.length - 7) +
      value.slice(value.length - 5)
    );
  } else {
    return "*".repeat(value.length);
  }
};

const phoneUtil = PhoneNumberUtil.getInstance();

export function maskPhoneNumber(phoneNumber?: string | null): string {
  if (!phoneNumber) {
    return "null";
  }

  const parsedNumber = parseOrNull(phoneNumber);

  if (!parsedNumber) {
    return phoneNumber;
  }

  if ((parsedNumber.getNationalNumber()?.toString().length ?? 0) < 4) {
    return phoneNumber;
  }

  const countryCode = parsedNumber.getCountryCode();

  const plusSign = "+";

  const lastFourChars = takeLastFour(phoneNumber);

  const maskedMid = "*".repeat(
    Math.max(
      phoneNumber.length -
        lastFourChars.length -
        String(countryCode).length -
        plusSign.length,
      0
    )
  );

  return `${plusSign}${countryCode}${maskedMid}${lastFourChars}`;
}

function takeLastFour(phoneNumber: string) {
  return phoneNumber.slice(phoneNumber.length - 4, phoneNumber.length);
}

function parseOrNull(phoneNumber: string) {
  try {
    return phoneUtil.parse(phoneNumber);
  } catch (error) {
    return null;
  }
}
