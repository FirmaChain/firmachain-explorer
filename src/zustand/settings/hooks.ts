import { useEffect } from 'react';

import { useSettingsStore } from './store';

export const useSettingsRecoil = () => {
    const initialize = useSettingsStore((state) => state.initialize);

    useEffect(() => {
        initialize();
    }, [initialize]);
};
