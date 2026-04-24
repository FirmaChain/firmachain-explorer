import { useEffect, useState } from 'react';
import { useScreenSize } from '@hooks';

export const useDesktop = () => {
    const { isDesktop } = useScreenSize();
    const [isMenu, setMenu] = useState(false);

    useEffect(() => {
        // if window size shrinks to tablet/mobile we will close any open tabs
        if (!isDesktop) {
            turnOffAll();
        }
    }, [isDesktop]);

    const toggleMenu = () => {
        setMenu(!isMenu);
    };

    /**
     * Helper that will check and turn off any open tabs
     */
    const turnOffAll = () => {
        setMenu(false);
    };

    return {
        isMenu,
        setMenu,
        toggleMenu,
        turnOffAll
    };
};
