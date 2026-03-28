import { makeStyles } from '@mui/styles';

export const useStyles = () => {
    const styles = makeStyles((theme) => {
        return {
            mobile: {
                [theme.breakpoints.up('lg')]: {
                    display: 'none'
                }
            },
            desktop: {
                display: 'none',
                [theme.breakpoints.up('lg')]: {
                    display: 'block'
                }
            }
        };
    })();

    return styles;
};
