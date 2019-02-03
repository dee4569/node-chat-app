const expect = require('expect');

const {isRealString} = require('./validation.js')

describe('isRealString', () =>{
    it('should reject non string vales', () =>{
        var number = 123;

        var res = isRealString(number);
        expect (res).toBe(false);

    });

    it('should reject string with only spaces', () =>{
        var string = '   '

        var res = isRealString(string);
        expect(res).toBe(false);
    });

    it('should allow string with non space characters', () =>{
        var string = '   sadf   '

        var res = isRealString(string);
        expect(res).toBe(true);
    });
});