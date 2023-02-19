import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

const AutoCompleteTeacher = (props) => {
    const {list ,label, onChange, sx} = props;
    const [selectValue, setSelectValue] = useState(null);
    return(
        <Autocomplete
        value={selectValue}
        onChange={(event, newValue) => {
          onChange(newValue == null ? '' : newValue.id)
          setSelectValue(newValue)
        }}
        options={list}
        getOptionLabel={(option) => option.name}
        id={`${label}-autocomplete`}
        sx={sx}
        renderInput={(params) => <TextField {...params} label={label} />}
        />
    )
}

export default AutoCompleteTeacher;