import { useRef, useEffect } from 'react';

export const useClickOutside = (callback: () => void) => {
    const ref = useRef(null);
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                ref.current &&
                !(ref.current as Node).contains(event.target as Node)
            ) {
                callback();
            }
        };
        document.addEventListener('click', handleClickOutside, true);
        return () => {
            document.removeEventListener('click', handleClickOutside, true);
        };
    }, [callback]);
    return ref;
};