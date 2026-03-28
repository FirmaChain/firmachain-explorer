import { makeStyles } from '@mui/styles';

export const useStyles = () => {
    const styles = makeStyles(() => {
        return {
            root: {
                overflow: 'auto'
            },
            table: {
                '& .MuiTableBody-root': {
                    '& .MuiTableCell-root': {
                        whiteSpace: 'nowrap'
                    }
                }
            }
        };
    })();

    return styles;
};
