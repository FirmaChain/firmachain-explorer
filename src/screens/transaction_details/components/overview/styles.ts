import { makeStyles } from '@mui/styles';

export const useStyles = () => {
    const styles = makeStyles(
        (theme) => {
            return {
                root: {
                    '& .memo': {
                        alignItems: 'flex-start',
                        '& .label': {
                            marginRight: theme.spacing(5)
                        }
                    }
                }
            };
        },
        { index: 1 }
    )();

    return styles;
};
