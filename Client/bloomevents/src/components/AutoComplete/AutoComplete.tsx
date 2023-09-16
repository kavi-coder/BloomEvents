import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

interface Option {
  value: string;
  label: string;
}

function AutoComplete({ array, label, selectedOption, color }: any) {
  const selectOption = (e: React.ChangeEvent<{}>, option: Option | null) => {
    selectedOption(option);
  };

  return (
    <Autocomplete
      className={`${color === true ? "bg-[#ffe6b7cc]" : "bg-white"})`}
      disablePortal
      onChange={selectOption}
      id="combo-box-demo"
      color="warning"
      options={array}
      getOptionLabel={(option: Option) => option.label}
      // sx={{
      //   width: "100%",
      //   "&:focus": {
      //     borderColor: "blue",
      //     boxShadow: (theme) => `0 0 0 2px ${theme.palette.primary.main}`,
      //   },
      // }}
      sx={{
        width: "100%",
        "& .MuiOutlinedInput-root": {
          "&:hover": {
            borderColor: "red",
          },
          "&.Mui-focused": {
            borderColor: "red",
          },
        },
      }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
}

export default AutoComplete;
