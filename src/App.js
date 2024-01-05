import React, { Component } from 'react';
import './App.css';
import 'tachyons';
import BarcodeGenerator from './Components/BarcodeGenerator';
import InvalidBarcodes from './Components/InvalidBarcodeGenerator';
import InputBox from './Components/Input';
import Logo from './img/logo_navy.png';
import PrintButton from './Components/PrintButton';
import dataValidator from './Components/dataValidator';

class App extends Component {
  constructor() {
    super();
    this.state = {
      // input: [],
      validCodes: [],
      invalidCodes: []
    }
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onButtonSubmit = () => {
    if (/(\d{7,8}|\d{11,13})/.test(this.state.input)) {
      let { validBarcodes, invalidBarcodes } = dataValidator(this.state.input);
      this.setState({
        validCodes: validBarcodes,
        invalidCodes: invalidBarcodes
      });
    } else {
      alert('Please enter at least 1 valid UPC');
    }
  }

  render() {
    const { validCodes, invalidCodes } = this.state;

    return (
      <div className="App">
        <header className="tc pt4 pb2">
          <img src={Logo} className="b--black-10 h4 shadow-2" alt="logo" />
          <h1 className="f3 fw6 black-70">My lil UPC Barcode Generator</h1>
        </header>
        <div>
          <span className="f5 black-70 b">
            Input UPCs:
            <br />
          </span>

          <InputBox onInputChange={this.onInputChange} />
        </div>
        <div>
          <a className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-kiwi-green"
            href="#0"
            onClick={this.onButtonSubmit}>Barcode me</a>
        </div>
        {validCodes.length > 0
          && (<div>
            <PrintButton />
            <BarcodeGenerator barcodes={validCodes} />
          </div>)
        }

        {invalidCodes.length > 0
          && <InvalidBarcodes barcodes={invalidCodes} />
        }
      </div>
    );
  }
}
export default App;
