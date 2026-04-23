import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import * as jdenticon from 'jdenticon';

const Avatar: React.FC<{
    className?: string;
    imageUrl?: string;
    address: string;
}> = ({ className, address, imageUrl }) => {
    const icon = useRef(null);
    const [error, setError] = useState<boolean>(false);
    useEffect(() => {
        jdenticon.update(icon.current, address);
    }, [address, error, imageUrl]);

    useEffect(() => {
        setError(false);
    }, [address]);

    const handleError = () => {
        setError(true);
    };

    return (
        <Box
            className={className}
            sx={(theme) => ({
                width: '28px',
                height: '28px',
                minWidth: '28px',
                minHeight: '28px',
                borderRadius: '50%',
                overflow: 'hidden',
                background: theme.palette.custom.general.surfaceTwo,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                '& img': {
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    objectPosition: 'center center'
                }
            })}
        >
            {imageUrl && !error ? (
                <img src={imageUrl} alt="address avatar" onError={handleError} />
            ) : (
                <svg data-jdenticon-value={address} height="100%" ref={icon} width="100%" />
            )}
        </Box>
    );
};

export default Avatar;
