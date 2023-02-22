import { formatOrdinals } from "@/helper/ordinal";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";


const SemesterSelector = (props) => {

    const {list, value ,onChange, label, sx} = props;

    function handleChange(e)
    {
        onChange(e.target.value);
    }

    return(
        <Box sx={sx}>
        <FormControl fullWidth>
        <InputLabel id={`${label}_select-label`}>{label}</InputLabel>
        {list && <Select
            labelId={`${label}_select-label`}
            id={`${label}_select`}
            label={label}
            value={value || ''}
            onChange={handleChange}
          >
              <MenuItem key={'none'} value=''><em>None</em></MenuItem>
                  {
                    ((list).map((item, idx) => {
                          return(
                          <MenuItem key={idx} value={item.semester}> {formatOrdinals(item.semester)}</MenuItem>
                          )
                          }))}
                  
          </Select>}
          </FormControl>
          </Box>
    )
}

export default SemesterSelector;