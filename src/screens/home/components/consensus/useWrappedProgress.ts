import { useEffect, useRef, useState } from 'react';

type UseWrappedProgressOptions = {
    wrapDelay?: number;
};

export const useWrappedProgress = (value: number, options: UseWrappedProgressOptions = {}) => {
    const { wrapDelay = 120 } = options;

    const [displayValue, setDisplayValue] = useState(() => Math.max(0, Math.min(100, value)));
    const prevValueRef = useRef(Math.max(0, Math.min(100, value)));
    const timeoutRef = useRef<number | null>(null);

    useEffect(() => {
        const prevValue = prevValueRef.current;
        const nextValue = Math.max(0, Math.min(100, value));

        if (timeoutRef.current !== null) {
            window.clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        if (nextValue < prevValue) {
            setDisplayValue(100);

            timeoutRef.current = window.setTimeout(() => {
                setDisplayValue(nextValue);
                timeoutRef.current = null;
            }, wrapDelay);
        } else {
            setDisplayValue(nextValue);
        }

        prevValueRef.current = nextValue;

        return () => {
            if (timeoutRef.current !== null) {
                window.clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, [value, wrapDelay]);

    return displayValue;
};
