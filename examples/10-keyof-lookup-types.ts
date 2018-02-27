// key of and lookup types

class FakeImmutable<T> {
    setValue<K extends keyof T>(field: K, val: T[K]): FakeImmutable<T> {
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