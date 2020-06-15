import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";


const useStyles = makeStyles((theme) => ({
    root: {
        margin: theme.spacing.unit * 2,
        padding: theme.spacing.unit * 1
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    textField: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
        width: 200,
    },
    item: {
        padding: theme.spacing.unit * 2
    }
}));

export default function DatePicker(props) {

    const classes = useStyles();

    const handleSubmit = e => {
        e.preventDefault();

        console.log(e);
    };

    const [dateFrom, setDateFrom] = React.useState(new Date());
    const [dateTo, setDateTo] = React.useState(new Date());

    const handleDateFromChange = (date) => {
        setDateFrom(date);
    };
    const handleDateToChange = (date) => {
        setDateTo(date);
    };

    return (
        <div className={classes.root}>
            <Grid direction="column" alignItems="center">
                <Grid item xs={12}>
                    <form>
                        <Grid item xs={12}>
                            <div style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center"
                            }}>
                                <TextField
                                id="dateFrom"
                                label="Date From"
                                type="date"
                                defaultValue={dateFrom - 10}
                                className={classes.textField}
                                onChange={handleDateFromChange}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            <TextField
                                id="dateTo"
                                label="Date To"
                                type="date"
                                defaultValue={React.useState(new Date())}
                                className={classes.textField}
                                InputLabelProps={{
                                    shrink: true,
                                }}
                            />
                            </div>
                        </Grid>

                    </form>
            </Grid>
            </Grid>
        </div >
    )
}