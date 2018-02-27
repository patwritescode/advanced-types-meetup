/**
 * What's new in 2.7 for types?
 * - Improved type inference for object literals
 * - Constant named properties
 * - Type guards inferred from 'in' operator
 * - numeric separators
 */

const test = false;
const obj = test ? { text: "hello" } : {};
const val = obj.text;
// the above fails because obj type is inferred as {} instead of
// { text: string } | { text? : undefined }


 
const SERIALIZE = Symbol("some-key");
interface ISerializable {
    [SERIALIZE](obj: {}): string;
}
// the above is valid in 2.7

interface A { a: number };
interface B { b: string };

function foo(x: A | B) {
    if("a" in x) {
        return x.a;
    }
    return x.b;
}
// the above is valid in 2.7

const million = 1_000_000;
// the above is valid in 2.7