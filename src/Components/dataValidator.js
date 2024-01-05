import { validateUPCChecksum } from './upcChecker';
import { UPCLookup } from './upcLookup';

const dataValidator = (barcodeResults) => {

  // Split on new line if multiple lines exist
  const lines = barcodeResults.split('\n').filter((line) => line.trim() !== '');

  const parsedData = lines.map((line) => {
    const elements = line.split(/,|-/);

    // Only process lines that contain a digits 7-13 length
    if (/\d{7,13}/.test(line)) {
      let upc = elements[0].trim().replace(/"/g, '');

      const description = elements.length > 1 && !/(\d{7,8}|\d{11,13})/.test(elements[1])
        ? elements.slice(1).join(',').trim().replace(/"/g, '')
        : UPCLookup(upc);

      const checkUPC = validateUPCChecksum(upc);
      checkUPC.correctedUPC ? upc = checkUPC.correctedUPC : upc = checkUPC.validatedUPC;
      return { upc, description, isValid: checkUPC.isValid };
    }
    return null;

  });

  const filteredData = parsedData.filter((item) => item !== null);
  const validBarcodes = filteredData.filter((item) => item.isValid);
  const invalidBarcodes = filteredData.filter((item) => !item.isValid);
  return { validBarcodes, invalidBarcodes }
}

export default dataValidator;