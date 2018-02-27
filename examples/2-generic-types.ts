class Something<T> {
    performAction(val: T): Something<T> {
        return this;
    }
}

const something = new Something<string>();
// polymorphic this type
something
    .performAction("hello")
    .performAction("goodbye");

something
    .performAction(12345); // <- does not work
