import SortDownIcon from '@assets/icon-sort-down.svg?react';
import { Box } from '@mui/material';
import { alpha } from '@mui/material/styles';

const SortArrows = ({ className, sort }: { className?: string; sort?: 'asc' | 'desc' }) => {
    return (
        <Box
            className={className}
            sx={(theme) => ({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                height: '18px',
                width: '18px',
                '& .sort-svg': {
                    position: 'absolute',
                    width: '14px',
                    height: '14px',
                    right: 0,
                    fill: theme.palette.custom.fonts.fontTwo
                },
                '& .sort-svg.up': {
                    transform: 'rotate(180deg)'
                },
                '& .sort-svg.up.desc': {
                    fill: alpha(theme.palette.custom.fonts.fontThree, 0.2)
                },
                '& .sort-svg.down.asc': {
                    fill: alpha(theme.palette.custom.fonts.fontThree, 0.2)
                }
            })}
        >
            <SortDownIcon className={`sort-svg up ${sort === 'desc' ? 'desc' : ''}`.trim()} />
            <SortDownIcon className={`sort-svg down ${sort === 'asc' ? 'asc' : ''}`.trim()} />
        </Box>
    );
};

export default SortArrows;
