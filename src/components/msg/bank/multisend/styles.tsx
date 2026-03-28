import { makeStyles } from '@mui/styles';

export const useStyles = () => {
    const styles = makeStyles(() => {
        return {
            multisend: {
                marginTop: '0'
            }
        };
    })();

    return styles;
};
