import React from 'react';

class PrintButton extends React.Component {
  handlePrint = () => {
    const elementsToPrint = document.getElementById('divToPrint');

    if (elementsToPrint) {
      const printWindow = window.open('center', 'center', 'width=700,height=700');
      printWindow.document.open();
      printWindow.document.write('<html><head><title>Print</title></head><body>');
      printWindow.document.write(elementsToPrint.innerHTML);
      printWindow.document.write('</body></html>');
      printWindow.document.close();

      printWindow.onafterprint = () => printWindow.close();
      printWindow.print();
    } else {
      alert('No barcodes to print!');
    }
  };

  render() {
    return (
      <a
        className="f6 grow no-underline br-pill ph3 pv2 mb2 dib white bg-kiwi-green"
        href="#0"
        onClick={this.handlePrint}>Print
      </a>
    );
  }
}

export default PrintButton;
