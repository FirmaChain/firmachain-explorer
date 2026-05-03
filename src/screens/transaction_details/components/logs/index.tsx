import { Box } from '@components';
import { Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useTranslation } from 'react-i18next';

interface Props extends ComponentDefault {
    datas: null | any[];
    isEvents: boolean;
}

const Logs = ({ datas, isEvents = false }: Props) => {
    const theme = useTheme();
    const { t } = useTranslation('transactions');
    return (
        <div style={{ overflow: 'hidden' }}>
            <Box>
                <Typography variant="h2" sx={{ pb: 2 }}>
                    {isEvents ? t('events') : t('logs')}
                </Typography>
                <pre
                    style={{
                        maxHeight: '400px',
                        overflow: 'auto',
                        padding: '1rem',
                        margin: '0',
                        background: theme.palette.background.default,
                        flex: 1
                    }}
                >
                    <code style={{ whiteSpace: 'pre-wrap' }}>{JSON.stringify(datas, null, 4)}</code>
                </pre>
            </Box>
        </div>
    );
};

export default Logs;
