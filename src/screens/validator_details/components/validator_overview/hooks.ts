import { copyText } from '@utils/copy';
import { toast } from 'react-toastify';

export const useAddress = (t) => {
    const handleCopyToClipboard = async (value: string) => {
        const success = await copyText(value);
        if (success) toast(t('common:copied'));
    };

    return {
        handleCopyToClipboard
    };
};
