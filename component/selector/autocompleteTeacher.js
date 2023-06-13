import Autocomplete from "@mui/material/Autocomplete";
import TextField from "@mui/material/TextField";

const AutoCompleteTeacher = (props) => {
    const {list ,label, onChange, sx, value} = props;
    return(
        <Autocomplete
        value={value}
        onChange={(event, newValue) => {
          onChange(newValue)
        }}
        options={list}
        getOptionLabel={(option) => option.name}
        isOptionEqualToValue={(option, value) => option.id === value.id}
        id={`${label}-autocomplete`}
        sx={sx}
        renderInput={(params) => <TextField {...params} label={label} />}
        />
    )
}

export default AutoCompleteTeacher;