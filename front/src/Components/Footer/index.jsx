import { Button, Stack, Typography } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import InstagramIcon from "@mui/icons-material/Instagram";
import TelegramIcon from "@mui/icons-material/Telegram";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import WestIcon from "@mui/icons-material/West";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../Logo";

export default function Footer() {
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
  //     </Stack>
  //   </>
  // ));
  return (
    <>
      <Stack component={"footer"} sx={{ padding: "15px 15px 15px 0" , width: "70%" , position:"absolute" , bottom: "0" , transform: "translateX(-50%)" , left: "50%"}}>
        <Stack sx={{gap:"20px"}}>
          {/* Footer Part One */}
          <Stack sx={{ flexDirection: "row" }}>
            <Stack
              sx={{
                boxShadow: "0 0 12px rgba(0, 0, 0, .13)",
                flexDirection: "row",
                alignItems: "center",
                padding: "0 40px",
                width: { xl: "70%", lg: "70%", md: "70%" },
                height: "125px",
                background: "#23232B",
                borderRadius: "4px",
                gap: "40px",
              }}
            >
              <Stack
                sx={{ flexDirection: "row", alignItems: "center", gap: "15px" }}
              >
                <Stack
                  sx={{
                    width: "62px",
                    height: "62px",
                    background: "#463C25",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "5px",
                  }}
                >
                  <SettingsIcon sx={{ color: "#FFC107", fontSize: "30px" }} />
                </Stack>
                <Stack>
                  <Typography sx={{ color: "#9ba1a6", fontSize: "13px" }}>
                    مورد نیاز
                  </Typography>
                  <Link
                    to={"/"}
                    style={{
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "15px",
                      color: "#fff",
                    }}
                  >
                    نرم‌افزار‌های پخش فیلم{" "}
                    <WestIcon style={{ color: "#9ba1a6", fontSize: "14px" }} />
                  </Link>
                </Stack>
              </Stack>
              <Stack
                sx={{ flexDirection: "row", alignItems: "center", gap: "15px" }}
              >
                <Stack
                  sx={{
                    width: "62px",
                    height: "62px",
                    background: "#2D3348",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "5px",
                  }}
                >
                  <VolumeUpIcon sx={{ color: "#6898F8", fontSize: "30px" }} />
                </Stack>
                <Stack>
                  <Typography sx={{ color: "#9ba1a6", fontSize: "13px" }}>
                    پخش دوبله
                  </Typography>
                  <Link
                    to={"/"}
                    style={{
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "15px",
                      color: "#fff",
                    }}
                  >
                    راهنمای تنظیم صدا
                    <WestIcon
                      style={{ color: "#9ba1a6", fontSize: "14px" }}
                    />{" "}
                  </Link>
                </Stack>
              </Stack>
              <Stack
                sx={{ flexDirection: "row", alignItems: "center", gap: "15px" }}
              >
                <Stack
                  sx={{
                    width: "62px",
                    height: "62px",
                    background: "#323E31",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "5px",
                  }}
                >
                  <PlayCircleIcon sx={{ color: "#89D64F", fontSize: "30px" }} />
                </Stack>
                <Stack>
                  <Typography sx={{ color: "#9ba1a6", fontSize: "13px" }}>
                    راهنمای تنظیم صدا{" "}
                  </Typography>
                  <Link
                    to={"/"}
                    style={{
                      fontWeight: "500",
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      fontSize: "15px",
                      color: "#fff",
                    }}
                  >
                    {" "}
                    راهنمای فرمت ها{" "}
                    <WestIcon style={{ color: "#9ba1a6", fontSize: "14px" }} />
                  </Link>
                </Stack>
              </Stack>
            </Stack>

            <Stack sx={{ width: "30%" }}>
              <Stack
                sx={{
                  width: "100%",
                  height: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "20px",
                }}
              >
                <Stack
                  sx={{
                    height: "51.5px",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "90%",
                    margin: "auto",
                    background: "#FA6F7A",
                    boxShadow: "0 0 5px #FA6F7A",
                  }}
                >
                  <Stack sx={{ width: "90%", margin: "auto", flexDirection: "row", justifyContent: "space-between" }}>
                    <Stack sx={{ flexDirection: "row", gap: "10px" }}>
                      <InstagramIcon style={{ fontSize: "25px" }} />
                      <Typography>صفحه اینستاگرام</Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: "row" }}>
                      <ArrowBackIosNewIcon />
                    </Stack>
                  </Stack>
                </Stack>
                <Stack
                  sx={{
                    height: "51.5px",
                    alignItems: "center",
                    justifyContent: "center",
                    width: "90%",
                    margin: "auto",
                    margin: "auto",
                    background: "#75C5EE",
                    boxShadow: "0 0 5px #75C5EE",
                  }}
                >
                  <Stack sx={{ width: "90%", margin: "auto", flexDirection: "row", justifyContent: "space-between" }}>
                    <Stack sx={{ flexDirection: "row", gap: "10px" }}>
                      <TelegramIcon style={{ fontSize: "25px" }} />
                      <Typography>کانال تلگرام</Typography>
                    </Stack>
                    <Stack sx={{ flexDirection: "row" }}>
                      <ArrowBackIosNewIcon />
                    </Stack>
                  </Stack>
                </Stack>
              </Stack>
            </Stack>
          </Stack>
          {/* Footer Part Two */}

          <Stack sx={{ padding: "20px 15px 20px 0px", }}>
            <Stack sx={{ flexDirection: "row" }}>
              {/* Logo */}
              <Logo />
              {/* Menu */}
              <Stack component={"ul"} sx={{ flexDirection: "row" }}>
                {""}
              </Stack>

              <Stack
                sx={{
                  color: "#70AB45",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "70px",
                }}
              >
                <Stack sx={{ gap: "5px", flexDirection: "row" }}>
                  <SettingsIcon style={{ color: "#89D64F" }} />
                  <Typography>اپلیکیشن آپ تی وی</Typography>
                </Stack>
                <Stack>
                  <Button
                    sx={{
                      background: "#2C3829",
                      color: "#70AB45",
                      "&:hover": { background: "#2C3829", color: "#70AB45" },
                    }}
                  >
                    دانلود
                  </Button>
                </Stack>
              </Stack>
            </Stack>
          </Stack>

          {/* Footer Part Three */}

          <Stack sx={{ borderTop: "1px solid #979288", paddingTop: "20px" }}>
            <Typography sx={{ color: "#979288" }}>استفاده از محتوا و لینک های دانلود آپ تی وی، مجاز نمی باشد. تمامی حقوق این سایت به نام آپ تی وی محفوظ است.</Typography>
          </Stack>
        </Stack>
      </Stack>
    </>
  );
}
