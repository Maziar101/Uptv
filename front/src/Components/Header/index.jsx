import { Box, Stack } from "@mui/material";
import React from "react";
import Logo from "../Logo";

export default function Header() {
  return (
    <>
      <Stack sx={{ padding: "20px" }} component={"header"}>
        <Stack sx={{ width: "80%", margin: "auto" }}>
          <Stack>
            {/* Logo */}
            <Logo />
            {/* Menu */}
            <Stack>
                
            </Stack>
          </Stack>
        </Stack>
        <Box></Box>
      </Stack>
    </>
  );
}
