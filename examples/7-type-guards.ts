/**
 * "pet is Cat" is the type guard declaration where the function result is the expression
    to satisfy the claim
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