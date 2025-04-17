function validateCreditCard(cardNumber) {
    // Remove spaces or dashes from the card number
    cardNumber = cardNumber.replace(/[\s-]/g, '');

    // Check if the card number is numeric
    if (!/^\d+$/.test(cardNumber)) {
        return { valid: false, bandeira: null, message: "Invalid card number format" };
    }

    // Determine the card brand (bandeira)
    let bandeira = null;

    if (cardNumber.startsWith('4')) {
        bandeira = 'Visa';
    } else if (/^5[1-5]/.test(cardNumber) || /^222[1-9]|22[3-9]\d|2[3-6]\d{2}|27[01]\d|2720/.test(cardNumber)) {
        bandeira = 'MasterCard';
    } else if (/^4011|4312|4389|.*(other Elo ranges here).*/.test(cardNumber)) {
        bandeira = 'Elo';
    } else if (/^34|37/.test(cardNumber)) {
        bandeira = 'American Express';
    } else if (/^6011|65|64[4-9]/.test(cardNumber)) {
        bandeira = 'Discover';
    } else if (cardNumber.startsWith('6062')) {
        bandeira = 'Hipercard';
    } else {
        bandeira = 'Unknown';
    }

    // Validate the card number using the Luhn algorithm
    const isValid = luhnCheck(cardNumber);

    return {
        valid: isValid,
        bandeira: isValid ? bandeira : null,
        message: isValid ? "Valid card number" : "Invalid card number"
    };
}

// Luhn algorithm implementation
function luhnCheck(cardNumber) {
    let sum = 0;
    let shouldDouble = false;

    // Process each digit from right to left
    for (let i = cardNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(cardNumber[i]);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

// Example usage
const cardInfo = validateCreditCard("3557232031236508");
console.log(cardInfo);