export class KaprekarUtils {
    static printKaprekarResult(iterations: number, maxIterations: number) {
        if (iterations === maxIterations) {
            console.log(`This input number is not valid for Kaprekar's routine`);
        } else {
            console.log(
                `Kaprekar's iteration count to reach 6174 is ${iterations}.`
            );
        }
    }
}
