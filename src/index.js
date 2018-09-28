function isOpeningBracket(bracketsConfig, bracket) {
    return !!bracketsConfig.find( (element) => bracket === element[0] );
}

function isOpeningAndClosingBracket(bracketsConfig, bracket) {
    return !!bracketsConfig.find( (element) => bracket === element[0] && bracket === element[1] );
}

function isClosingBracketFor(bracketsConfig, closingBracket, openingBracket) {

    for (let j = 0, len = bracketsConfig.length; j < len; j++) {

        const isClosingSymbolFound = closingBracket === bracketsConfig[j][1];

        if (isClosingSymbolFound && openingBracket === bracketsConfig[j][0]) {
            return true;
        }

        if (isClosingSymbolFound && openingBracket !== bracketsConfig[j][0])
            return false;
    }
}

module.exports = function check(str, bracketsConfig) {

    let stack = [];

    for (let i = 0, len = str.length; i < len; i++) {
        const symbol = str.charAt(i);

        if (isOpeningAndClosingBracket(bracketsConfig, symbol)) {
            if (stack.length === 0) {
                stack.push(symbol);
                continue;
            }

            const lastInStack = stack[stack.length - 1];

            if (lastInStack === symbol) {
                stack.pop();
            } else {
                stack.push(symbol);
            }

            continue;
        }

        if (isOpeningBracket(bracketsConfig, symbol)) {
            stack.push(symbol);
            continue;
        }
        if (stack.length === 0)
            return false;

        const opening = stack.pop();

        if (!isClosingBracketFor(bracketsConfig, symbol, opening))
            return false;

    }

    return stack.length === 0;
};