'use strict';

function checkPostcode(postcode) {
    const length = postcode.length;
    if(length === 5 || length === 9 || length === 10){
        return true;
    } else {
        return 'your postcode is wrong!';
    }
}

function buildPostcodeArr(postcode) {
    let postcodeArr;
    if(postcode.indexOf('-')){
        postcodeArr = postcode.replace('-', '').split('').map(postcodeDigit => parseInt(postcodeDigit));
    } else {
        postcodeArr = postcode.split('').map(postcodeDigit => parseInt(postcodeDigit));
    }

    const sum = postcodeArr.reduce((a, b) => a + b);
    const cd = 10 - sum % 10;
    if (cd !== 10){
        postcodeArr.push(cd);
    } else {
        postcodeArr.push(0);
    }

    return postcodeArr;
}

function buildBarcode(postcodeArr, barcodeDigits) {
    return postcodeArr.map(postcode => {
        for (const barcodeDigit of barcodeDigits){
            if (postcode === barcodeDigit.digit){
                return barcodeDigit.str;
            }
        }
    });
}


function buildBarcodeText(barcode) {
    let text = ``;
    for(const item of barcode){
        text += `${item}`;
    }
   //const text = barcode.map(item => `${item}`);
    return `|${text}|`;
}

module.exports = {
    checkPostcode : checkPostcode,
    buildPostcodeArr :  buildPostcodeArr,
    buildBarcode : buildBarcode,
    buildBarcodeText : buildBarcodeText
};
