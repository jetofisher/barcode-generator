import React from 'react';
import Barcode from 'react-jsbarcode';

const InvalidBarcodes = ({ barcodes }) => {

  return (
    <div id="invalidBarcodes">
      {barcodes.map((item, i) => (
        item.isValid === false && (
          <span className="barcodeSpan" key={i}>
            <Barcode
              value={item.upc}
              options={{
                textAlign: "center",
                text: item.upc + '|INVALID BARCODE',
                textMargin: 5,
                fontSize: 10,
                lineColor: '#c40000',
                margin: 30,
                flat: true
              }} />
          </span>
        )))
      }
    </div>
  );
}

export default InvalidBarcodes;
