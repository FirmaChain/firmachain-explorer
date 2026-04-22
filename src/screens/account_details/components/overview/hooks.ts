import { useState } from 'react';
import { copyText } from '@utils/copy';
import { toast } from 'react-toastify';

export const useOverview = (t) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCopyToClipboard = async (value: string) => {
        const success = await copyText(value);
        if (success) toast(t('common:copied'));
    };

    return {
        open,
        handleClose,
        handleOpen,
        handleCopyToClipboard
    };
};
