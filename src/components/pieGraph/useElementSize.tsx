import { useEffect, useRef, useState } from 'react';

type ElementSize = {
    width: number;
    height: number;
};

export const useElementSize = () => {
    const ref = useRef<HTMLDivElement | null>(null);
    const [size, setSize] = useState<ElementSize>({
        width: 0,
        height: 0
    });

    useEffect(() => {
        const element = ref.current;

        if (!element) return;

        let rafId: number | null = null;

        const observer = new ResizeObserver((entries) => {
            const entry = entries[0];

            if (!entry) return;

            const { width, height } = entry.contentRect;

            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }

            rafId = requestAnimationFrame(() => {
                setSize((prev) => {
                    // Prevent unnecessary renders when the measured size is unchanged.
                    if (prev.width === width && prev.height === height) {
                        return prev;
                    }

                    return { width, height };
                });
            });
        });

        observer.observe(element);

        return () => {
            if (rafId !== null) {
                cancelAnimationFrame(rafId);
            }

            observer.disconnect();
        };
    }, []);

    return {
        ref,
        width: size.width,
        height: size.height
    };
};
