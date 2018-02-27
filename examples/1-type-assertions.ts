/**
 * Type Assertion:
 * - Two forms of assertion, generic cast and cast as.
 * - Similar to casting in other languages such as C# but doesn't have any runtime impact
 * - Indicates to the compiler to trust your input as a specific type
 */


const someValue: any = "this is a string";
const stringLength = (<string>someValue).length;
const stringLength2 = (someValue as string).length;