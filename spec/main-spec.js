'use strict';

const app = require('../src/app');

const barcodeDigits = [
    {digit:1, str:':::||'},
    {digit:2, str:'::|:|'},
    {digit:3, str:'::||:'},
    {digit:4, str:':|::|'},
    {digit:5, str:':|:|:'},
    {digit:6, str:':||::'},
    {digit:7, str:'|:::|'},
    {digit:8, str:'|::|:'},
    {digit:9, str:'|:|::'},
    {digit:0, str:'||:::'}
];

describe('input postcode print barcode', () => {
   describe('input postcode without '-' like 95713', () => {
      const postcode = '95713';
      it('checkPostcode', ()=> {
         const checkResult = app.checkPostcode(postcode).toString();
         expect(checkResult).toEqual('true');
      });

      it('get postcodeArr', () => {
         const barcodeArr = app.buildPostcodeArr(postcode);
         const expectArr = [9,5,7,1,3,5];
         expect(barcodeArr).toEqual(expectArr);
      });

      it('get barcode', () => {
         const postcodeArr = [9,5,7,1,3,5];
         const barcode = app.buildBarcode(postcodeArr, barcodeDigits);

         const expectBarcode = ['|:|::',':|:|:','|:::|',':::||','::||:',':|:|:'];

         expect(barcode).toEqual(expectBarcode);
      });

      it('get barcodeText', () => {
         const barcode = ['|:|::',':|:|:','|:::|',':::||','::||:',':|:|:'];
         const barcodeText = app.buildBarcodeText(barcode);

         const expectText = '||:|:::|:|:|:::|:::||::||::|:|:|';

         expect(barcodeText).toEqual(expectText);
      });
   });

    describe('input postcode with '-' like 45056-1234', () => {
        const postcode = '45056-1234';
        it('checkPostcode', ()=> {
            const checkResult = app.checkPostcode(postcode).toString();
            expect(checkResult).toEqual('true');
        });

        it('get postcodeArr', () => {
            const barcodeArr = app.buildPostcodeArr(postcode);
            const expectArr = [4,5,0,5,6,1,2,3,4,0];
            expect(barcodeArr).toEqual(expectArr);
        });

        it('get barcode', () => {
            const postcodeArr = [4,5,0,5,6,1,2,3,4,0];
            const barcode = app.buildBarcode(postcodeArr, barcodeDigits);

            const expectBarcode = [':|::|',':|:|:','||:::',':|:|:',':||::',':::||','::|:|','::||:',':|::|','||:::'];

            expect(barcode).toEqual(expectBarcode);
        });

        it('get barcodeText', () => {
            const barcode = [':|::|',':|:|:','||:::',':|:|:',':||::',':::||','::|:|','::||:',':|::|','||:::'];
            const barcodeText = app.buildBarcodeText(barcode);

            const expectText = '|:|::|:|:|:||::::|:|::||:::::||::|:|::||::|::|||:::|';

            expect(barcodeText).toEqual(expectText);
        });
    });

    describe('input wrong postcode', () =>{
       const postcode = '234';
        it('check postcode', () => {
            const mistake = app.checkPostcode(postcode);
            expect(mistake).toEqual('your postcode is wrong!');
        });
    });
});

describe('input barcode print postcode', () => {
});
