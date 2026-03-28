import React from 'react';
import useTranslation from '@/adapters/i18n/useTranslation';
import { formatNumber, formatTokenByExponent } from '@/utils/format_token';
import { Name } from '@components';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useProfilesRecoil } from '@recoil/profiles';

type Recipient = {
    address: string;
    amount: string;
};

const CommunityPoolSpend: React.FC<{
    className?: string;
    recipients: Recipient[];
}> = ({ recipients }) => {
    const { t } = useTranslation('proposals');
    const profiles = useProfilesRecoil(recipients.map((r) => r.address));

    return (
        <div style={{ overflow: 'auto' }}>
            <Table style={{ tableLayout: 'fixed' }}>
                <TableHead>
                    <TableRow>
                        <TableCell style={{ width: '55%' }}>{t('recipient')}</TableCell>
                        <TableCell style={{ width: '45%' }}>{t('amount')}</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {recipients.map((r, i) => {
                        const profile = profiles[i];
                        const displayName = profile?.name ?? r.address;
                        const amount = formatNumber(formatTokenByExponent(r.amount, 6));
                        return (
                            <TableRow key={r.address}>
                                <TableCell style={{ width: '55%' }}>
                                    <Name name={displayName} address={r.address} />
                                </TableCell>
                                <TableCell style={{ width: '45%' }}>{`${amount} FCT`}</TableCell>
                            </TableRow>
                        );
                    })}
                </TableBody>
            </Table>
        </div>
    );
};

export default CommunityPoolSpend;
