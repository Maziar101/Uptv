import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import React, { useEffect, useState } from "react";
import Logo from "../Logo";
import Toast from "../Toast";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/Slices/TokenSlice";

export default function Header() {
  const [category, setCategory] = useState();
  const [openAccountIcon, setOpenAccountIcon] = useState(false);
  const Dispatch = useDispatch();
  const { token, user } = useSelector((state) => state.token);
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
  const handleOpenAccount = () => {
    setOpenAccountIcon(!openAccountIcon);
    console.log(openAccountIcon);
  };
  return (
    <>
      <Stack
        sx={{
          padding: "20px",
          width: "100%",
          display: "flex",
          position: "fixed",
          top: "0",
          height: "51.5px",
          backdropFilter: "blur(10px) !important",
          transition: "all 400ms",
          background:
            "linear-gradient(to bottom,rgba(0,0,0,0.99) 0px,transparent)",
        }}
        component={"header"}
      >
        <Stack sx={{ width: "70%", margin: "auto", flexDirection: "row", position: "relative" }}>
          <Stack sx={{ width: "80%", margin: "auto" , marginRight: "-12px !important" }}>
            <Stack sx={{ flexDirection: "row" }}>
              {/* Logo */}
              <Logo />
              {/* Menu */}
              <Stack component={"ul"}>{""}</Stack>
            </Stack>
          </Stack>
          <Stack
            sx={{
              flexDirection: "row",
              alignItems: "center",
              width: "25%",
              pl: "29px",
              gap: "15px",
            }}
          >
            <AccountCircleIcon
              style={{ fontSize: "30px", cursor: "pointer" }}
              onClick={handleOpenAccount}
            />
            {openAccountIcon && (
              <>
                <Stack
                  sx={{
                    width: "200px",
                    height: token && user ? "100px" :"30px",
                    borderRadius: "6px",
                    position: "absolute",
                    top: "70px",
                    left: "242px",
                    background: "#363636",
                    zIndex: "10",
                    padding: "10px 0 10px 0",
                    textAlign:"center",
                    justifyContent:"center",
                    gap:"15px"
                  }}
                >
                  {token && user ? (
                    <>
                      <Typography>سلام {user?.name?.slice(0,8)} عزیز</Typography>
                      <Typography  onClick={() => Dispatch(logout)} sx={{ color: '#F88E8A' , borderTop:"1px solid #fff" , pt:"16px" , cursor:"pointer"}}>
                        خروج از اکانت
                      </Typography>
                    </>
                  ) : (
                    <Link to={"/login-register"} style={{
                      textAlign: "center",
                      color: "#fff"
                    }}
                    >
                      ورود / ثبت نام
                    </Link>
                  )}
                </Stack>
              </>
            )}
            <TextField
              placeholder="کلمه مورد نظر ..."
              sx={{
                background: "#6898F8",
                width: "300px",
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
                    color: "#000",
                    padding: "10px 10px",
                  },
                  "& .MuiInputBase-input::placeholder": {
                    color: "#000",
                    padding: "0px !important",
                    fontWeight: "400",
                    fontFamily: "Iran",
                    fontSize: "15px",
                    opacity: 1,
                  },
                },
              }}
            />
          </Stack>
        </Stack>
      </Stack>
      <Toast type={toast.type} message={toast.message} />
    </>
  );
}
