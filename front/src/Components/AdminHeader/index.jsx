import { Stack, TextField } from "@mui/material";
import React from "react";
import Logo from "../Logo";

export default function AdminHeader() {
  return (
    <Stack
      sx={{
        padding: "10px 20px",
        gap: "50px",
        marginTop: "20px",
        flexDirection: "row",
        alignItems: "center",
      }}
    >
      <Logo />
      <TextField
        placeholder="کلمه مورد نظر ..."
        sx={{
          background: "#131316",
          width: "313px",
          border: "none",
          height: "45px",
          borderRadius: "5px",

          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              border: "none",
            },
            "&:hover fieldset": {
              border: "none",
            },
            "&.Mui-focused fieldset": {
              border: "none",
            },
            "& .MuiInputBase-input": {
              color: "white",
              padding: "10px 10px",
            },
            "& .MuiInputBase-input::placeholder": {
              color: "white",
              padding: "0px !important",
              fontWeight: "100",
              fontFamily: "Iran",
              fontSize: "15px",
              opacity: 1,
            },
          },
        }}
      />
    </Stack>
  );
}
