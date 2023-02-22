import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

const AutoCompleteTeacher = (props) => {
    const {list ,label, onChange, sx, value, editable} = props;
    const [selectValue, setSelectValue] = useState(value != null  && value != '' ? value : null);

    return(
        <Autocomplete
        value={selectValue}
        onChange={(event, newValue) => {
          onChange(newValue == null ? '' : newValue.id)
          setSelectValue(newValue)
        }}
        options={list}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id == value.id}
        id={`${label}-autocomplete`}
        sx={sx}
        renderInput={(params) => <TextField {...params} label={label} />}
        />
    )
}

export default AutoCompleteTeacher;