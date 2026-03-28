import { makeStyles } from '@mui/styles';

export const useStyles = () => {
    const styles = makeStyles(() => {
        return {
            root: {
                height: '100%'
            }
        };
    })();

    return styles;
};
