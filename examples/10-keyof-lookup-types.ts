/**
 * keyof and lookup types
 * - Enforce types that expect property names and/or values as parameters
 * - Compiler checks that property is available on the type
 * - Checks that the value is also the value of the property on the type
 */

class FakeImmutable<T> {
    setValue<K extends keyof T>(field: K, val: T[K]): FakeImmutable<T> {
        // do some immutable stuff
        return this;
    }
}

class Person {
    name: string;
    age: number;
}

const fakeImmutable = new FakeImmutable<Person>();
fakeImmutable.setValue("name", "test");
fakeImmutable.setValue("name", 123); // not valid!
fakeImmutable.setValue("age", 123); // valid!