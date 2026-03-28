import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';

export const useAddress = (t) => {
    const handleCopyToClipboard = (value: string) => {
        copy(value);
        toast(t('common:copied'));
    };

    return {
        handleCopyToClipboard
    };
};
