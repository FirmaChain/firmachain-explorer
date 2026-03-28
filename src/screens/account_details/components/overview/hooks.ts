import { useState } from 'react';
import copy from 'copy-to-clipboard';
import { toast } from 'react-toastify';

export const useOverview = (t) => {
    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    };

    const handleCopyToClipboard = (value: string) => {
        copy(value);
        toast(t('common:copied'));
    };

    return {
        open,
        handleClose,
        handleOpen,
        handleCopyToClipboard
    };
};
