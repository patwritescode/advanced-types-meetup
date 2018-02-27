/**
 * Type Guards
 * - Union Type example used a "typeof" type guard for primitive types
 * - Classes and Functions can use instanceof type guards but be cautious
 *   since you can't always guarantee your objects will maintain their types
 *   after mutation by external libs.
 * - User Defined type guards use an expression to perform a runetime check that
 *   guarantees the type in some scope.
 */
interface Fish {
    swim: () => void;
    name: string;
}

interface Cat {
    climb: () => void;
    name: string;
}
const isCat = (pet: Fish | Cat): pet is Cat => {
    return (<Cat>pet).climb !== undefined;
}
const doAction = (pet: Fish | Cat): void => {
    if(isCat(pet)) {
        pet.climb();
    }
    else {
        pet.swim();
    }
}

/**
 * Instanceof checks the constructor
 */
interface ISomething<T> {
    value: T;
}

class StringSomething implements ISomething<string> {
    constructor(public value: string) {}
}

class NumberSomething implements ISomething<number> {
    constructor(public value: number) {}
}

const doSomething = (something: StringSomething | NumberSomething) => {
    if(something instanceof StringSomething) {
        // we know value is a string here
        something.value = "test";
        return something.value;
    }
    else if(something instanceof NumberSomething) {
        // we know value is a number here
        something.value = 123;
        return something.value;
    }
}