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