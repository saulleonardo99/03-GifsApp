import { useState } from "react";

export const useCounter = (initialValue: number = 10) => {
    const [counter, setCounter] = useState(initialValue);

    const handleAdd = () => {
        setCounter(counter+1);
    };
    const handleSubstract = () => {
        setCounter((prevState) => prevState-1);
    };
    const handleReset = () => {
        setCounter(5);
    };

    return {
        // Properties
        counter,
        // Methoods / Actions
        handleAdd,
        handleSubstract,
        handleReset
    }
}
