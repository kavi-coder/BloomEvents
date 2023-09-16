import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";

function SignupDropDown({ val, array, title, func1, userDistrict }: any) {
  // console.log(array);

  return (
    <FormControl sx={{ m: 0, width: 1 }}>
      <InputLabel id="demo-simple-select-helper-label">{title}</InputLabel>
      <Select
        color="warning"
        labelId="demo-simple-select-helper-label"
        id="demo-simple-select-helper"
        value={val}
        {...func1("district", {
          required: true,
        })}
        label={title}
        defaultValue={userDistrict}>
        <MenuItem value="" disabled>
          <em>None</em>
        </MenuItem>

        {array.map((e: any, i: number) => (
          <MenuItem value={e.district} key={i + 1}>
            {e.district}
          </MenuItem>
        ))}

        {/* <MenuItem value={10}>Ten</MenuItem>
        <MenuItem value={20}>Twenty</MenuItem>
        <MenuItem value={30}>Thirty</MenuItem> */}
      </Select>
    </FormControl>
  );
}

export default SignupDropDown;
function register(
  arg0: string,
  arg1: { required: boolean }
): JSX.IntrinsicAttributes &
  import("@mui/material/Select").SelectProps<unknown> {
  throw new Error("Function not implemented.");
}
