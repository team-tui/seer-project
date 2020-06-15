import React, { useState } from "react";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(2),
        minWidth: 120,
    },
    button: {
        margin: theme.spacing(1),
        spacing: 8,
    },
    selectEmpty: {
        marginTop: theme.spacing(2),
    },
}));

export default function NativeSelects(props) {


    const classes = useStyles();
    const input = props.inputArray;

    const temp = '';
    const state = useState();

    const handleChange = (event) => {
        temp = event.target.value;
    };

    const handleUpdate = event => {
        this.setState({ selected: event.target.value, name: event.target.name });
    };
    return (
        <div id="container">            
            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="nameOfField">Name of Field</InputLabel>
                <Select
                    native
                    value={state.temp}
                    onChange={handleChange, props.onChange}
                    inputProps={{
                        name: 'nameOfField',
                        id: 'nameOfField',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={10}>TDD</option>
                </Select>
            </FormControl>

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="operator">Operator</InputLabel>
                <Select
                    native
                    value={state.temp}
                    onChange={handleChange, props.onChange}
                    inputProps={{
                        name: 'operator',
                        id: 'operator',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={1}>is equal to</option>
                    <option value={2}>contains</option>
                    <option value={3}>does not contain</option>
                    <option value={4}>begins with</option>
                    <option value={5}>ends with</option>
                </Select>
            </FormControl>

            <TextField
                className={classes.formControl}
                id="standard-basic"
                label="Value"
                onChange={handleChange, props.onChange}
                inputProps={{
                    name: 'value',
                    id: 'value',
                }}
            />

            <FormControl className={classes.formControl}>
                <InputLabel htmlFor="logic">Logic</InputLabel>
                <Select
                    native
                    value={state.temp}
                    onChange={handleChange, props.onChange}
                    inputProps={{
                        name: 'logic',
                        id: 'logic',
                    }}
                >
                    <option aria-label="None" value="" />
                    <option value={1}>AND</option>
                    <option value={2}>OR</option>
                    <option value={3}>AND NOT</option>
                    <option value={4}>OR NOT</option>
                </Select>
            </FormControl>

            <Button
                className={classes.button}
                variant="contained"
                color="primary"
                className={classes.button}
                startIcon={<AddIcon />}
                onClick={props.onClickAdd}
                size="small"
            >
                Add
            </Button>

            <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                className={classes.button}
                startIcon={<DeleteIcon />}
                onClick={props.onClickRemove}
                size="small"
            >
                Delete
            </Button>
        </div>
    );
}