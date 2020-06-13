import React, { useState, Fragment } from "react";
import API from '..//../utils/API';
import _nameOfFields from "./dropDownForm"
import Button from '@material-ui/core/Button';


export default function SearchForm(props) {

    const [searchParameters, setParamList] = useState([
        { nameOfField: '', operator: '', value: '', logic: "" }
    ]);

    const handleSubmit = e => {
        e.preventDefault();

        console.log("searchParameters", searchParameters);
    };

    const items = [
        { value: 1, primaryText: 'Never' },
        { value: 2, primaryText: 'Every Night' },
        { value: 3, primaryText: 'Weeknights' },
    ]


    const handleInputChange = (index, event) => {
        const values = [...searchParameters];

        if (event.target.name === 'nameOfField') {
            values[index].nameOfField = event.target.value;
        }
        else if (event.target.name === 'operator') {

            switch (event.target.value) {
                case '1':
                    values[index].operator = '$eq';
                    break;
                case '2':
                    values[index].operator = '$regex';
                    break;
                case '3':
                    values[index].operator = '$not;$regex';
                    break;
                case '4':
                // fall through
                case '5':
                    values[index].operator = '$regex: ; $options:';
                    break;
                default:
                    values[index].operator = '';
                    console.log('operator returned \'None\'');
                    break;
            }
        }
        else if (event.target.name === 'value') {
            values[index].value = event.target.value;
        }
        else if (event.target.name === 'logic') {
            //values[index].logic = event.target.value;
            switch (event.target.value) {
                case '1':
                    values[index].logic = '$and';
                    break;
                case '2':
                    values[index].logic = '&or';
                    break;
                case '3':
                    values[index].logic = '$not';
                    break;
                case '4':
                    values[index].logic = '$or';
                    break;
                default:
                    values[index].logic = '';
                    console.log('logic returned \'None\'');
            }
        } else {
            values[index].lastName = event.target.value;
        }

        setParamList(values);
    };

    const handleAddFields = () => {
        const values = [...searchParameters];
        values.push({ nameOfField: '', operator: '', value: '' });
        setParamList(values);
    };

    const handleRemoveFields = index => {
        const values = [...searchParameters];
        values.splice(index, 1);
        setParamList(values);
    };


    return (
        <div>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    {searchParameters.map((inputField, index) => (
                        <Fragment key={`${inputField}~${index}`}>
                            <div className="search-form"
                                style={{
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center"
                                }}>
                                <label htmlFor="nameOfField"></label>
                                <_nameOfFields
                                    inputArray={items}
                                    type="text"
                                    className="form-control"
                                    id="nameOfField"
                                    name="nameOfField"
                                    value={inputField.nameOfField}
                                    onChange={event => handleInputChange(index, event)}
                                    onClickAdd={() => handleAddFields()}
                                    onClickRemove={() => handleRemoveFields(index)}>
                                </_nameOfFields>
                            </div>
                        </Fragment>
                    ))}
                </div>

                <div align="right">
                    <Button variant="contained" color="primary" /* onClick={props.onClick} */>
                        Submit
                    </Button>
                </div>
                <br />
                <pre>
                    {JSON.stringify(searchParameters, null, 2)}
                </pre>


            </form>
        </div>
    )
}