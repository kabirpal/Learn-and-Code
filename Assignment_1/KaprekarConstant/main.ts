import { InputValidator } from "./inputValidator";
import { KaprekarCalculator } from "./kaprekarCalculator";
import { KaprekarUtils } from "./kaprekarUtils";
import constants from './Constants/constants';

export class Main {
    static startKaprekarRoutine() {
        const maxIterations = constants.maxIterations;
        const userInput = 9411;

        try {
            InputValidator.validateInputNumber(userInput);
            const iterations = KaprekarCalculator.kaprekarIterationCount(
                userInput,
                maxIterations
            );
            KaprekarUtils.printKaprekarResult(iterations, maxIterations);
        } catch (error: any) {
            console.error(error.message);
        }
    }
}

Main.startKaprekarRoutine();
