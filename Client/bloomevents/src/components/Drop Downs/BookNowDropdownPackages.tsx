import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function BookNowDropdownPackages({ val, array, func, title }: any) {
  //console.log(array);
  return (
    <FormControl fullWidth sx={{ m: 1, minWidth: 120 }}>
      <InputLabel id="demo-simple-select-standard-label">{title}</InputLabel>
      <Select
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        color="warning"
        value={val != 0 ? val : null}
        onChange={(e) => func(e.target.value)}
        label={title}>
        {/* <MenuItem value="" disabled>
          <em>None</em>
        </MenuItem> */}

        {array.map((e: any, i: number) => (
          <MenuItem value={e.packageId.toString()} key={i + 1}>
            {e.packageName}
          </MenuItem>
        ))}

        {/* <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
    </FormControl>
  );
}

export default BookNowDropdownPackages;
