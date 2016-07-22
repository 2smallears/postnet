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
    return `|${text}|`;
}


function checkBarcode(barcode) {
    const length = barcode.length;
    if (length === 32 || length === 77){
        return true;
    } else {
        return 'your barcode is wrong!';
    }
}

function buildBarcodeArr(barcode)  {

    const barcodeStr = barcode.substr(1, barcode.length - 1);
    let string=[];
    let str='';

    for(let n of barcodeStr){
        str+=n;
        if(str.length%5===0){
            string.push(str);
            str='';
        }
    }
    return string;
}

function buildPostcodeDigits(barcodeArr, barcodeDigits) {
    return barcodeArr.map(barcodeArrItem => {
       for (const barcodeDigit of barcodeDigits){
           if (barcodeArrItem === barcodeDigit.str){
               return barcodeDigit.digit;
           }
       }
    });
}


function buildPostcode(postcodeDigits) {
    const sum = postcodeDigits.map(digit => parseInt(digit)).reduce((a, b) => a + b);
    if (sum % 10 === 0){
        postcodeDigits.pop();
        return postcodeDigits.map(digit => `${digit}`).join('');
    } else {
        console.log('your barcode is wrong!');
    }
}

module.exports = {
    checkPostcode : checkPostcode,
    buildPostcodeArr :  buildPostcodeArr,
    buildBarcode : buildBarcode,
    buildBarcodeText : buildBarcodeText,

    checkBarcode : checkBarcode,
    buildBarcodeArr : buildBarcodeArr,
    buildPostcodeDigits :  buildPostcodeDigits,
    buildPostcode : buildPostcode
};
