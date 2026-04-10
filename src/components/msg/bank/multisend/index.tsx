import React from 'react';
import Trans from '@/adapters/i18n/Trans';
import useTranslation from '@/adapters/i18n/useTranslation';
import { Name } from '@components';
import { Box, Typography } from '@mui/material';
import { MsgMultiSend } from '@models';
import { useProfileRecoil, useProfilesRecoil } from '@zustand/profiles';
import { formatNumber, formatToken } from '@utils/format_token';
import * as R from 'ramda';

const Multisend = (props: { message: MsgMultiSend }) => {
    const { t } = useTranslation('transactions');

    const { message } = props;

    const sender = R.pathOr({}, ['inputs', 0], message);
    const senderAmount = sender?.coins
        ?.map((x: any) => {
            const amount = formatToken(x.amount, x.denom);
            return `${formatNumber(amount.value, amount.exponent)} ${amount.displayDenom.toUpperCase()}`;
        })
        .reduce((text: string, value: string, i: number, array: string[]) => text + (i < array.length - 1 ? ', ' : ` ${t('and')} `) + value);

    const userSend = useProfileRecoil(sender?.address);
    const validatorMoniker = userSend ? userSend?.name : sender?.address;

    const receivers = message?.outputs?.map((output) => {
        const parsedAmount = output?.coins
            ?.map((x: any) => {
                const amount = formatToken(x.amount, x.denom);
                return `${formatNumber(amount.value, amount.exponent)} ${amount.displayDenom.toUpperCase()}`;
            })
            .reduce((text: string, value: string, i: number, array: string[]) => text + (i < array.length - 1 ? ', ' : ` ${t('and')} `) + value);

        return {
            address: output.address,
            parsedAmount
        };
    });

    const receiverProfiles = useProfilesRecoil(receivers.map((x) => x.address));

    return (
        <div>
            <Typography>
                <Trans
                    i18nKey="message_contents:txMultisendContentOne"
                    components={[<Name address={sender?.address} name={validatorMoniker} />, <b />]}
                    values={{
                        amount: senderAmount
                    }}
                />
            </Typography>
            <Box sx={{ mt: 0 }}>
                {receivers?.map((x, i) => {
                    const recieverUser = receiverProfiles[i];
                    const recieverMoniker = recieverUser ? recieverUser?.name : x?.address;
                    return (
                        <Typography key={`${x.address}-${i}`}>
                            <Trans
                                i18nKey="message_contents:txMultisendContentTwo"
                                components={[<Name address={x?.address} name={recieverMoniker} />, <b />]}
                                values={{
                                    amount: x.parsedAmount
                                }}
                            />
                        </Typography>
                    );
                })}
            </Box>
        </div>
    );
};

export default Multisend;
