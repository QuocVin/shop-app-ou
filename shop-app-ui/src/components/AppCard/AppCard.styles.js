import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles((theme) => ({
    AppCard: {
        maxWidth: 345,
    },
    media: {
        height: 320,
    },
    rowAct: {
        display: 'flex',
        justifyContent: 'space-between',
    },
    content: {
        overflow: 'hidden',
        height: '50px',
        wordBreak: 'break-all',
    },
    priceLabel: {
        marginLeft: '10px'
    }
}));