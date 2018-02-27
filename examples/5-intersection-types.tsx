/**
 * Intersections
 * - Combine multiple types into one
 * - Resulting type will have all members of all types intersected
 * - Used primarily for concepts that don't always fit the class object-oriented
 *   mold, which is very common in JS.
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

const SomeStatelessComponent = (props: IStateProps & IOwnProps & IDispatchProps) => {
    if(props.isVisible) {
        return null
    }
    return (
        <div>
            {props.title}
            <button onClick={props.doSomething}>do something</button>
        </div>
    )
}

const mapStateToProps = (state): IStateProps => {
    return {
        title: "something"
    }
}

const mapDispatchToProps = (): IDispatchProps => ({
    doSomething: () => console.log("button clicked")
});

<SomeStatelessComponent isVisible={true}/>