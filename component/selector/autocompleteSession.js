import { Autocomplete, TextField } from "@mui/material";
import { useState } from "react";

const AutoCompleteSession = (props) => {
  const { list, label, onChange, sx } = props;
  const [selectValue, setSelectValue] = useState(null);
  return (
    <Autocomplete
      value={selectValue}
      onChange={(event, newValue) => {
        onChange(newValue == null ? '' : newValue.exam_session)
        setSelectValue(newValue)
      }}
      options={list}
      getOptionLabel={(option) => option.exam_session.toString()}
      isOptionEqualToValue={(option, value) => option.exam_session == value.exam_session}
      id={`${label}-autocomplete`}
      sx={sx}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  )
}

export default AutoCompleteSession;