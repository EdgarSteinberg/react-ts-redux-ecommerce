import { useState } from "react";

export const useCounter = (valorInicial = 1, stock = 10) => {
    const [count, setCount] = useState(valorInicial);

    const increment = () => {
        setCount(prev => (prev < stock ? prev + 1 : prev));
    }

    const decrement = () => {
        setCount(prev => (prev > 1 ? prev - 1 : prev));
    }

    return { count, increment, decrement };
};
