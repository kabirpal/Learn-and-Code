export class InputValidator {
    static validateInputNumber(inputNumber: number): void {
        if (inputNumber < 1000 || inputNumber > 9999) {
            throw new Error('Please enter a 4-digit number.');
        }
    }
}
