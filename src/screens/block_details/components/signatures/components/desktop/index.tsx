import React from 'react';
import { AvatarName } from '@components';
import { useTranslation } from 'react-i18next';

import { DataTable, type DataTableColumn } from '@/components/DataTable';

type DesktopProps = {
    className?: string;
    signatures: AvatarName[];
};

const Desktop: React.FC<DesktopProps> = ({ className, signatures }) => {
    const { t } = useTranslation('blocks');

    const columns: DataTableColumn<AvatarName>[] = [
        {
            key: 'validator',
            header: t('validator'),
            render: (row) => <AvatarName address={row.address} imageUrl={row.imageUrl} name={row.name} />
        }
    ];

    return <DataTable data={signatures} columns={columns} getRowId={(row) => row.address} height="450px" rowHeight={50} />;
};

export default Desktop;
