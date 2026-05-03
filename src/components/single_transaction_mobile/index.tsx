import { ReactNode } from 'react';
import { Box, SxProps, Theme, Typography } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
    className?: string;
    block: ReactNode;
    hash: ReactNode;
    time: string;
    messages: string;
    type: any;
    result?: ReactNode;
}

const SingleTransactionMobile = ({ className, block, hash, time, messages, type, result }: Props) => {
    const { t } = useTranslation('transactions');
    const itemSx: SxProps<Theme> = (theme) => ({
        mb: 2,
        '& .label': {
            mb: 1,
            display: 'block',
            color: theme.palette.custom.fonts.fontThree
        },
        '& .value': {
            display: 'block',
            color: theme.palette.custom.fonts.fontTwo
        },
        '& p.value': {
            color: theme.palette.custom.fonts.fontTwo
        },
        '& a': {
            color: theme.palette.custom.fonts.highlight
        }
    });

    return (
        <Box className={className} sx={{ width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', '& > div': { width: '50%' } }}>
                <Box sx={itemSx}>
                    <Typography variant="h4" className="label" component="span">
                        {t('block')}
                    </Typography>
                    {block}
                </Box>
                <Box sx={itemSx}>
                    <Typography variant="h4" className="label" component="span">
                        {t('type')}
                    </Typography>
                    <Typography variant="body1" className="value" component="span">
                        {type}
                    </Typography>
                </Box>
            </Box>
            <Box sx={itemSx}>
                <Typography variant="h4" className="label" component="span">
                    {t('hash')}
                </Typography>
                <Typography variant="body1" className="value" component="span">
                    {hash}
                </Typography>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', '& > div': { width: '50%' } }}>
                {!!messages && (
                    <Box sx={itemSx}>
                        <Typography variant="h4" className="label" component="span">
                            {t('messages')}
                        </Typography>
                        <Typography variant="body1" className="value" component="span">
                            {messages}
                        </Typography>
                    </Box>
                )}
                <Box sx={itemSx}>
                    <Typography variant="h4" className="label" component="span">
                        {t('result')}
                    </Typography>
                    {result}
                </Box>
            </Box>
            <Box sx={itemSx}>
                <Typography variant="h4" className="label" component="span">
                    {t('time')}
                </Typography>
                <Typography variant="body1" className="value" component="span">
                    {time}
                </Typography>
            </Box>
        </Box>
    );
};

export default SingleTransactionMobile;
