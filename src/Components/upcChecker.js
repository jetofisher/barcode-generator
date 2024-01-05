export const validateUPCChecksum = (testUPC) => {

  let isValid = true;
  const isInputValid = /^(?:(\d{7,8}|\d{11,13}))$/.test(testUPC);

  if (!isInputValid) {
    return { validatedUPC: testUPC, isValid: false }
  } else {

    let digits = testUPC.split("").map(Number);

    const calculateChecksum = (digits) => {
      const sumOdd = digits.filter((_, index) => index % 2 === 0).reduce((acc, digit) => acc + digit, 0);
      const sumEven = digits.filter((_, index) => index % 2 === 1).reduce((acc, digit) => acc + digit, 0);
      const total = sumOdd * 3 + sumEven;
      const checksum = (10 - (total % 10)) % 10;

      return checksum;
    }

    const findIfValidChecksumExist = (array) => {
      const calculatedChecksum = calculateChecksum(array.slice(0, -1));
      const originalChecksum = array[array.length - 1];

      return calculatedChecksum !== originalChecksum ? false : true;
    }

    // If UPC is 8 or 12 digits, validate the checksum
    if (digits.length === 8 || digits.length === 12) {
      const validateUPCChecksum = findIfValidChecksumExist(digits);

      return !validateUPCChecksum
        ? { validatedUPC: testUPC, isValid: false }
        : { validatedUPC: digits.join(''), isValid };
    }

    // If input is 7 or 11 digits, calculate the checksum and append it
    if (digits.length === 7 || digits.length === 11) {
      const checksum = calculateChecksum(digits);

      return { validatedUPC: testUPC + checksum, isValid };
    }

    // If UPC is 13 digits and starts with 0, trim start and end and test both altered UPCs
    if (digits.length === 13 && digits[0] === 0) {

      const trimUPCStart = digits.slice(1);
      const trimUPCEnd = digits.slice(0, -1);

      const trimStartUPC = findIfValidChecksumExist(trimUPCStart);
      const trimEndUPC = findIfValidChecksumExist(trimUPCEnd);

      if (!trimStartUPC && !trimEndUPC) {
        return { validatedUPC: testUPC, isValid: false };
      }

      if (trimStartUPC) { return { validatedUPC: trimUPCStart.join(''), isValid } };
      if (trimEndUPC) { return { validatedUPC: trimUPCEnd.join(''), isValid } };

    }
  }
}