import { makeStyles } from '@mui/styles';

export const useStyles = () => {
    const styles = makeStyles((theme) => {
        return {
            root: {
                ...theme.mixins.layout,
                '& a': {
                    color: theme.palette.custom.fonts.highlight
                }
            }
        };
    })();

    return styles;
};
