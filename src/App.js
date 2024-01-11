import React, { Component, useState } from 'react';
import './App.css';
import 'tachyons';
import BarcodeGenerator from './Components/BarcodeGenerator';
import InvalidBarcodes from './Components/InvalidBarcodeGenerator';
import InputBox from './Components/Input';
import Logo from './img/logo_navy.png';
import PrintButton from './Components/PrintButton';
import dataValidator from './Components/dataValidator';


function App() {
  const [inputValue, setInputValue] = useState([]);
  const [validCodes, setValidCodes] = useState([]);
  const [invalidCodes, setInvalidCodes] = useState([]);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  }

  const handleButtonSubmit = () => {
    if (/(\d{7,8}|\d{11,13})/.test(inputValue)) {
      const { validBarcodes, invalidBarcodes } = dataValidator(inputValue);
      setValidCodes(validBarcodes);
      setInvalidCodes(invalidBarcodes);
    } else {
      alert('Please enter at least 1 valid UPC');
    }
  }

  return (
    <div className="App">
      <header className="tc pt4 pb2">
        <img src={Logo} className="b--black-10 h4 shadow-2" alt="logo" />
        <h1 className="f3 fw6 black-70">My lil UPC Barcode Generator</h1>
      </header>
      <div>
        <span className="f5 black-70 b">Input UPCs:<br /></span>

        <InputBox onInputChange={handleInputChange} />
      </div>
      <div>
        <a className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-kiwi-green"
          href="#0"
          onClick={handleButtonSubmit}>Barcode me</a>
      </div>
      {validCodes.length > 0
        && (<div>
          <PrintButton />
          <div className="barcodeHeader mt4 f5 fw6 black-40 bb pb2 mb3 pl1">Valid Barcodes ({validCodes.length})</div>
          <BarcodeGenerator barcodes={validCodes} />
        </div>)
      }

      {invalidCodes.length > 0
        &&
        (<div>
          <div className="barcodeHeader mt4 f5 fw6 black-40 bb pb2 mb3 pl1">Invalid Barcodes ({invalidCodes.length})</div>
          <InvalidBarcodes barcodes={invalidCodes} />
        </div>)
      }
    </div>
  );
}

export default App;
