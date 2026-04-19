import useTranslation from '@/adapters/i18n/useTranslation';
import { LoadAndExist } from '@components';
import { Box } from '@mui/material';

import { Logs, Messages, Overview } from './components';
import { useTransactionDetails } from './hooks';

const TransactionDetails = () => {
    const { t } = useTranslation('transactions');
    const { state, onMessageFilterCallback, toggleMessageDisplay, filterMessages } = useTransactionDetails();
    const { overview, events, logs, messages } = state;
    const filteredMessages = filterMessages(messages.items);

    return (
        <LoadAndExist loading={state.loading} exists={state.exists}>
            <Box
                sx={(theme: any) => ({
                    ...theme.mixins.layout,
                    display: 'grid',
                    gridTemplateRows: 'auto auto',
                    gridTemplateColumns: '1fr',
                    gridGap: theme.spacing(1),
                    '& a': {
                        color: theme.palette.custom.fonts.highlight
                    },
                    [theme.breakpoints.up('lg')]: {
                        gridGap: theme.spacing(2)
                    }
                })}
            >
                <Overview data={overview} />
                <Messages
                    messages={filteredMessages}
                    viewRaw={messages.viewRaw}
                    toggleMessageDisplay={toggleMessageDisplay}
                    onMessageFilterCallback={onMessageFilterCallback}
                />
                {!!logs && logs.length > 0 && <Logs datas={logs} isEvents={false} />}
                {!!events && events.length > 0 && <Logs datas={events} isEvents />}
            </Box>
        </LoadAndExist>
    );
};

export default TransactionDetails;
