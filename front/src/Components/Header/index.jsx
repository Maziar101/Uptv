import { Box, Stack, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Toast from "../Toast";
import { Link } from "react-router-dom";

export default function Header() {
  const [category, setCategory] = useState();
  const [toast, setToast] = useState({ type: "info", message: "nothing" });
  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(process.env.REACT_APP_BASE_API + "/category");
        const data = await res.json();
        setCategory(data);
      } catch (err) {
        setToast({ type: "error", message: err.message });
      }
    })();
  }, []);
  // const categories = category?.map((cat) => (
  //   <>
  //     <Stack component={"li"}>
  //       <Link to={`/category/${cat.englishName}`}>{cat.name}</Link>
  //       <Stack component={"ul"}>
  //         {cat?.submenu?.map((sub) => {
  //           <Stack component={"li"}>{sub.name}</Stack>;
  //         })}
  //       </Stack>
  //     </Stack>
  //   </>
  // ));
  return (
    <>
      <Stack sx={{ padding: "20px", width: "100%" , display: "flex" , position:"fixed",top:"0", height: "51.5px" , backdropFilter:"blur(10px) !important" , transition:"all 400ms" ,background: "linear-gradient(to bottom,rgba(0,0,0,0.99) 0px,transparent)"}} component={"header"}>
        <Stack sx={{width:"70%",margin:"auto", flexDirection: "row"}}>
          <Stack sx={{ width: "80%", margin: "auto" }}>
            <Stack>
              {/* Logo */}
              <Logo />
              {/* Menu */}
              <Stack component={"ul"}>{''}</Stack>
            </Stack>
          </Stack>
          <Box>
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
          </Box>
        </Stack>

      </Stack>
      <Toast type={toast.type} message={toast.message} />
    </>
  );
}
