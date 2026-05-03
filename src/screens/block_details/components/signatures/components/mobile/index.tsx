import { AvatarName } from '@components';
import { Box, Typography } from '@mui/material';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { DataTable, type DataTableColumn } from '@/components/DataTable';

type SignatureItem = AvatarName;

type MobileProps = {
    className?: string;
    signatures?: SignatureItem[];
};

const Mobile = ({ className, signatures }: MobileProps) => {
    const { t } = useTranslation('blocks');
    const items = signatures ?? [];

    const columns: DataTableColumn<SignatureItem>[] = [
        {
            key: 'validator',
            header: '',
            render: (row) => (
                <Box
                    sx={(theme) => ({
                        '& .label': {
                            mb: 0.5,
                            color: theme.palette.custom.fonts.fontThree
                        },
                        '& p.value': {
                            color: theme.palette.custom.fonts.fontTwo
                        },
                        '& a': {
                            color: theme.palette.custom.fonts.highlight
                        }
                    })}
                >
                    <Typography variant="h4" className="label">
                        {t('validator')}
                    </Typography>
                    <AvatarName address={row.address} imageUrl={row.imageUrl} name={row.name} />
                </Box>
            )
        }
    ];

    return (
        <Box className={clsx(className)} sx={{ height: '100%', minHeight: 0 }}>
            <DataTable data={items} columns={columns} getRowId={(row) => row.address} height="100%" hideHeader />
        </Box>
    );
};

export default Mobile;
