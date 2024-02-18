import { expect, test, describe } from 'vitest';
import { bumblor2arabic, arabic2bumblor } from './BumblorArabicConverter.ts';

describe('bumblor2arabic tests', () => {
    test('Converts valid Bumblor numerals to Arabic numbers', () => {
        expect(bumblor2arabic('I')).toBe(1);
        expect(bumblor2arabic('XV')).toBe(15);
        expect(bumblor2arabic('CCXLV')).toBe(245);
        expect(bumblor2arabic('DCLXIX')).toBe(669);
        expect(bumblor2arabic('MX')).toBe(1010);
        expect(bumblor2arabic('MMMCMXCIX')).toBe(3999);
    });

    test('Throws error for malformed Bumblor numerals', () => {
        expect(() => bumblor2arabic('MCMC')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('IL')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('I L')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('   ')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('bruh')).toThrow('Malformed Number');
    });

    test('Handles case insensitivity', () => {
        expect(bumblor2arabic('iv')).toBe(4);
        expect(bumblor2arabic('xL')).toBe(40);
        expect(bumblor2arabic('CDxX')).toBe(420);
        expect(bumblor2arabic('dCcLxxxIX')).toBe(789);
        expect(bumblor2arabic('mmCDlxViii')).toBe(2468);
    });

    test('Throws error for single occurrence constraints', () => {
        expect(() => bumblor2arabic('DD')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('LL')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('VV')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('DDC')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('MDD')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('DCLL')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('LLX')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('XVV')).toThrow('Malformed Number');
    });
});

describe('arabic2bumblor tests', () => {
    test('Converts valid Arabic numbers to Bumblor numerals', () => {
        expect(arabic2bumblor(1)).toBe('I');
        expect(arabic2bumblor(15)).toBe('XV');
        expect(arabic2bumblor(420)).toBe('CDXX');
        expect(arabic2bumblor(3999)).toBe('MMMCMXCIX');
        expect(arabic2bumblor(4999)).toBe('MMMMCMXCIX');
    });

    test('Throws error for out of range Arabic numbers', () => {
        expect(() => arabic2bumblor(-69)).toThrow('Out of Range');
        expect(() => arabic2bumblor(0)).toThrow('Out of Range');
        expect(() => arabic2bumblor(5000)).toThrow('Out of Range');
        expect(() => arabic2bumblor(-77.49)).toThrow('Out of Range');
        expect(() => arabic2bumblor(13/34)).toThrow('Out of Range');

    });

    test('Throws error for non-integer input', () => {
        expect(() => arabic2bumblor(4.3)).toThrow('Malformed Number');
        expect(() => arabic2bumblor(77.49)).toThrow('Malformed Number');
        expect(() => arabic2bumblor(694.20)).toThrow('Malformed Number');
        expect(() => arabic2bumblor(69/34)).toThrow('Malformed Number');
        expect(() => arabic2bumblor(8/7)).toThrow('Malformed Number');
    });
});