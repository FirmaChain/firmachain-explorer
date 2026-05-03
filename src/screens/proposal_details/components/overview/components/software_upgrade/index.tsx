import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import numeral from 'numeral';
import { useTranslation } from 'react-i18next';

interface Props {
    className?: string;
    height: string;
    info: string;
    name: string;
}

const SoftwareUpgrade = ({ height, info, name }: Props) => {
    const { t } = useTranslation('proposals');
    return (
        <div
            style={{
                overflow: 'auto',
                whiteSpace: 'nowrap'
            }}
        >
            <Table>
                <TableBody>
                    <TableRow>
                        <TableCell>{t('name')}</TableCell>
                        <TableCell>{name}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{t('height')}</TableCell>
                        <TableCell>{numeral(height).format('0,0')}</TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell>{t('info')}</TableCell>
                        <TableCell>{info}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    );
};

export default SoftwareUpgrade;
