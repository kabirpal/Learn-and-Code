import constants from './Constants/constants';

export class KaprekarCalculator {
    static kaprekarIterationCount(
        inputNumber: number,
        maxIterations: number
    ): number {
        const kaprekarConstant = constants.kaprekarConstant;
        let iterations = constants.iterations;

        while (inputNumber !== kaprekarConstant && iterations < maxIterations) {
            inputNumber = this.calculateNextKaprekarNumber(inputNumber);
            console.log(inputNumber);
            iterations++;
        }

        return iterations;
    }

    private static calculateNextKaprekarNumber(inputNumber: number): number {
        const digits = this.getDigits(inputNumber);
        const descendingNumber = this.getDescendingNumber(digits);
        const ascendingNumber = this.getAscendingNumber(digits);
        return descendingNumber - ascendingNumber;
    }

    private static getDescendingNumber(digits: number[]): number {
        return parseInt(digits.slice().sort((firstDigit, secondDigit) => secondDigit - firstDigit).join(""),10);
    }

    private static getAscendingNumber(digits: number[]): number {
        return parseInt(digits.slice().sort((firstDigit, secondDigit) => firstDigit - secondDigit).join(""),10);
    }

    private static getDigits(inputNumber: number): number[] {
        return inputNumber.toString().split("").map(Number);
    }
}
