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