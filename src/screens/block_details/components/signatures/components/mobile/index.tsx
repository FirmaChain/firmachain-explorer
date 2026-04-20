import React from 'react';
import { AvatarName } from '@components';
import { useList, useListRow } from '@hooks';
import { Box, Divider, Typography } from '@mui/material';
import classnames from 'classnames';
import { useTranslation } from 'react-i18next';
import AutoSizer from 'react-virtualized-auto-sizer';
import { VariableSizeList as List } from 'react-window';

const Mobile: React.FC<{
    className?: string;
    signatures?: AvatarName[];
}> = ({ className, signatures }) => {
    const { t } = useTranslation('blocks');

    const { listRef, getRowHeight, setRowHeight } = useList();

    return (
        <Box className={classnames(className)} sx={{ height: '100%' }}>
            <AutoSizer>
                {({ height, width }) => {
                    return (
                        <List
                            className="List"
                            height={height}
                            itemCount={signatures.length}
                            itemSize={getRowHeight}
                            ref={listRef}
                            width={width}
                        >
                            {({ index, style }) => {
                                const { rowRef } = useListRow(index, setRowHeight);
                                const selectedItem = signatures[index];
                                return (
                                    <div style={style}>
                                        <div ref={rowRef}>
                                            {/* single signature start */}
                                            <Box sx={{ my: 2 }}>
                                                <Box
                                                    sx={(theme) => ({
                                                        mb: 2,
                                                        '& .label': {
                                                            mb: 1,
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
                                                    <AvatarName
                                                        address={selectedItem.address}
                                                        imageUrl={selectedItem.imageUrl}
                                                        name={selectedItem.name}
                                                    />
                                                </Box>
                                            </Box>
                                            {/* single signature end */}
                                            {index !== signatures.length - 1 && <Divider />}
                                        </div>
                                    </div>
                                );
                            }}
                        </List>
                    );
                }}
            </AutoSizer>
        </Box>
    );
};

export default Mobile;
