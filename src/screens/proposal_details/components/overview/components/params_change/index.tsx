import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { useTranslation } from 'react-i18next';

interface Props {
    className?: string;
    changes: {
        subspace: string;
        key: string;
        value: string;
    }[];
}

const ParamsChange = ({ changes }: Props) => {
    const { t } = useTranslation('proposals');
    const colWidth = {
        first: '20%',
        second: '35%',
        third: '45%'
    };
    return (
        <Table
            style={{
                tableLayout: 'fixed',
                width: '100%'
            }}
        >
            <TableHead>
                <TableRow>
                    <TableCell style={{ width: colWidth.first }}>{t('subspace')}</TableCell>
                    <TableCell style={{ width: colWidth.second }}>{t('key')}</TableCell>
                    <TableCell style={{ width: colWidth.third }}>{t('value')}</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {changes.map((row) => (
                    <TableRow key={row.key}>
                        <TableCell style={{ width: colWidth.first }}>{row.subspace}</TableCell>
                        <TableCell style={{ width: colWidth.second }}>{row.key}</TableCell>
                        <TableCell style={{ width: colWidth.third }}>{row.value}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default ParamsChange;
