/**
 * Interfaces
 * - Type checks the shape a value has
 * - Describes the contract between pieces of your code
 * - Cannot directly declare a primitive type, union, or intersection
 * - Can be extended or implemented from
 */

interface IProps {
    title: string;
    name: string;
    count: number;
    update: () => void;
}

interface IOther extends IProps {
    description: string;
}

class Other implements IOther {
    description: string;
    title: string;
    name: string;
    count: number;
    update () {
        console.log("updated");
    };
    
}