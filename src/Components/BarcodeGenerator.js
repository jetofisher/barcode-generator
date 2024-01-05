import React from "react";
import Barcode from 'react-jsbarcode';

const BarcodeGenerator = ({ barcodes }) => {

  return (
    <div id="divToPrint">
      <div className="barcodeHeader mt4 f5 fw6 black-40 bb pb2 mb3 pl1">Valid Barcodes</div>
      {barcodes.map((item, i) => (
        item.isValid && (
          <span className="barcodeSpan" key={i}>
            <Barcode
              value={item.upc}
              options={{
                valid: (valid) => { },
                // format: "UPC",
                textAlign: "center",
                text: item.description ? item.upc + '|' + item.description : item.upc,
                textMargin: 5,
                fontSize: 10,
                margin: 30,
                flat: true
              }} />
          </span>
        )
      ))
      }
    </div>
  );
}

export default BarcodeGenerator;
