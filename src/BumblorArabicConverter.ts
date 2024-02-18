function bumblor2arabic(bumblor: string): number {
    // regex a.k.a. regular expression to validate bumblor numerals
    // ^ asserts the start of the input string
    // $/i asserts the end of the input string and makes the regular expression case-insensitive
    // (M{0,4})         handles the thousands place
    // (CM|CD|D?C{0,3}) handles the hundreds place
    // (XC|XL|L?X{0,3}) handles the tens place
    // (IX|IV|V?I{0,3}) handles the ones place
    const romanRegex = /^(M{0,4})(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;

    if (!romanRegex.test(bumblor)) {
        throw new Error("Malformed Number");
    }

    const map = {
        M: 1000,
        CM: 900,
        D: 500,
        CD: 400,
        C: 100,
        XC: 90,
        L: 50,
        XL: 40,
        X: 10,
        IX: 9,
        V: 5,
        IV: 4,
        I: 1,
    };

    let result = 0;
    bumblor = bumblor.toUpperCase();

    for (const numeral  in map) {
        while (bumblor.startsWith(numeral)) {
            result += map[numeral];
            bumblor = bumblor.slice(numeral.length);
        }
    }

    return result;
}

function arabic2bumblor(arabic: number): string {
    if (arabic < 1 || arabic > 4999) {
        throw new Error("Out of Range");
    }

    if (!Number.isInteger(arabic)) {
        throw new Error("Malformed Number")
    }


    const map = [
        {value: 1000, numeral: "M"},
        {value: 900, numeral: "CM"},
        {value: 500, numeral: "D"},   // can appear only once
        {value: 400, numeral: "CD"},
        {value: 100, numeral: "C"},
        {value: 90, numeral: "XC"},
        {value: 50, numeral: "L"},    // can appear only once
        {value: 40, numeral: "XL"},
        {value: 10, numeral: "X"},
        {value: 9, numeral: "IX"},
        {value: 5, numeral: "V"},     // can appear only once
        {value: 4, numeral: "IV"},
        {value: 1, numeral: "I"},
    ];

    let result = "";

    for (const {value, numeral} of map) {
        while (arabic >= value) {
            result += numeral;
            arabic -= value;
        }
    }

    return result;
}

export { arabic2bumblor, bumblor2arabic };
