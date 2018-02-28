/**
 * What's new in 2.7 for types?
 * - Improved type inference for object literals
 * - Constant named properties and unique symbols
 * - Type guards inferred from 'in' operator
 * - numeric separators
 */

const test = false;
const obj = test ? { text: "hello" } : {};
const val = obj.text;
// the above fails because obj type is inferred as {} instead of
// { text: string } | { text? : undefined }

// unique symbol only allowed on const or readonly static properties. no two unique
// symbols can be assignble or comparable to each other.
const Bar: unique symbol = Symbol();
class C {
    static readonly StaticSymbol: unique symbol = Symbol();
}

// example on how to use 
const SERIALIZE: unique symbol = Symbol();
interface ISerializable {
    [SERIALIZE](obj: {}): string;
}

class JSONSerializableItem implements ISerializable {
    [SERIALIZE](obj: {}) {
        return JSON.stringify(obj);
    }
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