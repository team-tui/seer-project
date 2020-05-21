const backgroundShape = require("../../images/shape.svg");

const styles = theme => ({
    root: {
        flexGrow: 1,
        backgroundColor: theme.palette.grey["100"],
        overflow: "hidden",
        background: `url(${backgroundShape}) no-repeat`,
        backgroundSize: "cover",
        backgroundPosition: "0% 0%",
        paddingBottom: 200
    },
    grid: {
        width: 1200,
        margin: `0 ${theme.spacing(2)}px`,
        [theme.breakpoints.down("sm")]: {
            width: "calc(100% - 20px)"
        }
    },
    loadingState: {
        opacity: 0.05
    },
    paper: {
        padding: theme.spacing(3),
        margin: theme.spacing(2),
        textAlign: "left",
        color: theme.palette.text.secondary
    },
    rangeLabel: {
        display: "flex",
        justifyContent: "space-between",
        paddingTop: theme.spacing(2)
    },
    topBar: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center"
    },
    outlinedButtom: {
        textTransform: "uppercase",
        margin: theme.spacing(1)
    },
    actionButtom: {
        textTransform: "uppercase",
        margin: theme.spacing(1),
        width: 152,
        height: 36
    },
    blockCenter: {
        padding: theme.spacing(2),
        textAlign: "center"
    },
    block: {
        padding: theme.spacing(2)
    },
    loanAvatar: {
        display: "inline-block",
        verticalAlign: "center",
        width: 16,
        height: 16,
        marginRight: 10,
        marginBottom: -2,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.main
    },
    interestAvatar: {
        display: "inline-block",
        verticalAlign: "center",
        width: 16,
        height: 16,
        marginRight: 10,
        marginBottom: -2,
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.primary.light
    },
    inlining: {
        display: "inline-block",
        marginRight: 10
    },
    buttonBar: {
        display: "flex"
    },
    noBorder: {
        borderBottomStyle: "hidden"
    },
    mainBadge: {
        textAlign: "center",
        marginTop: theme.spacing(4),
        marginBottom: theme.spacing(4)
    }
});

export default styles;