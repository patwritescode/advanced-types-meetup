/**
 * Type Aliases
 * - Assigns a name to an existing type, does not declare a new type
 * - Cannot be extended or implemented from unless the type consists solely of extendable
 *   and implementable types.
 * - Can directly declare primitive, union, and intersected types
 */
interface IStateProps {
    title: string;
}

interface IOwnProps {
    isVisible: boolean;
}

interface IDispatchProps {
    doSomething: () => void;
}

type Props = IOwnProps & IStateProps & IDispatchProps;

type SomeInput = string | number;