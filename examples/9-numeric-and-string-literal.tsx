/**
 * Numeric and String Literal Types
 * - Allows you to specify the exact value a primitive number or string should have
 * - Useful when combined with union types and aliases
 * - Valuable over enums when declaring types of expected values of or from third party or
 *   already declared types
 */

type ColSize = "xs" | "sm" | "md" | "lg";
type ColValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
interface IColProps {
    size: ColSize;
    value: ColValue;
}

const Col = (props: IColProps) => {
    return (
        <div className={`col col-${props.size}-${props.value}`}/>
    );
}