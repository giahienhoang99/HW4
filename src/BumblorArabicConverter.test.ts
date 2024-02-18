import { expect, test, describe } from 'vitest';
import { bumblor2arabic, arabic2bumblor } from './BumblorArabicConverter.ts';

describe('bumblor2arabic tests', () => {
    test('Converts valid Bumblor numerals to Arabic numbers', () => {
        expect(bumblor2arabic('I')).toBe(1);
        expect(bumblor2arabic('MX')).toBe(1010);
        expect(bumblor2arabic('DCLXIX')).toBe(669);
        expect(bumblor2arabic('MMMCMXCIX')).toBe(3999);
    });

    test('Throws error for malformed Bumblor numerals', () => {
        expect(() => bumblor2arabic('MCMC')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('IL')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('I L')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('   ')).toThrow('Malformed Number');
    });

    test('Handles case insensitivity', () => {
        expect(bumblor2arabic('iv')).toBe(4);
        expect(bumblor2arabic('xL')).toBe(40);
        expect(bumblor2arabic('CDXX')).toBe(420);
    });

    test('Throws error for single occurrence constraints', () => {
        expect(() => bumblor2arabic('DD')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('LL')).toThrow('Malformed Number');
        expect(() => bumblor2arabic('VV')).toThrow('Malformed Number');
    });
});

describe('arabic2bumblor tests', () => {
    test('Converts valid Arabic numbers to Bumblor numerals', () => {
        expect(arabic2bumblor(1)).toBe('I');
        expect(arabic2bumblor(3999)).toBe('MMMCMXCIX');
    });

    test('Throws error for out of range Arabic numbers', () => {
        expect(() => arabic2bumblor(-69)).toThrow('Out of Range');
        expect(() => arabic2bumblor(0)).toThrow('Out of Range');
        expect(() => arabic2bumblor(5000)).toThrow('Out of Range');
        expect(() => arabic2bumblor(-77.49)).toThrow('Out of Range');
    });

    test('Throws error for non-integer input', () => {
        expect(() => arabic2bumblor(77.49)).toThrow('Malformed Number');
        expect(() => arabic2bumblor(69.420)).toThrow('Malformed Number');
    });
});