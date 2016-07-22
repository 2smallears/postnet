'use strict';

const app = require('../src/app');
//const load = require('load');

describe('input postcode print barcode', () => {
   describe('input postcode like 95713', () => {
      const postcode = '95713';
      it('checkPostcode', ()=> {
         const checkResult = app.checkPostcode(postcode).toString();
         expect(checkResult).toEqual('true');
      });

      it('get barcodeArr', () => {
         const barcodeArr = app.buildPostcodeArr(postcode);
         const expectArr = [9,5,7,1,3,5];
         expect(barcodeArr).toEqual(expectArr);
      });

      it('get barcode', () => {
         const postcodeArr = [9,5,7,1,3,5];
         //const barcodeDigits = load.loadBarcodeDigits();
         const barcodeDigits = [{digit:1, str:':::||'},
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
});
