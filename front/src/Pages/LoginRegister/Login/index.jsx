import { Button, Stack, TextField, Typography, styled } from "@mui/material";
import { Formik } from "formik";
import React, { useState } from "react";
import Toast from "../../../Components/Toast";
import { useDispatch } from "react-redux";

export default function Login(handleAcc) {
  // set Token And Name And Role
  const [toast,setToast] = useState({type:'info',message:''});
  const Dispatch = useDispatch();
  
  const onSubmit = async (values) => {
    console.log(values);
    // const res = await fetch(process.env.REACT_APP_BASE_API+'/auth',{
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify(values)
    // });
    // const data = await res.json();
    // if(data?.status === "success"){
    //   setToast({type:"success",message:"خوش آمدید"});
    // }else{
    //   setToast({type:'error',message:data?.message});
    // }
  };

  const FormInput = styled(TextField)(({ theme }) => ({
    width: "100%",
    background: "rgb(66, 66, 66)",
    borderRadius: "4px",
    "& .MuiOutlinedInput-root": {
      "&::placeholder": {
        color: "white",
        opacity: 1,
      },
      "& fieldset": {
        borderColor: "white",
      },
      "&:hover fieldset": {
        borderColor: "white",
      },
      "&.Mui-focused fieldset": {
        borderColor: "white",
      },
    },
  }));

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100vh",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Formik
        initialValues={{
          name: "",
          username: "",
          password: "",
        }}
        onSubmit={onSubmit}
      >
        <Stack sx={{ gap: "10px", background: "#1c1c22" }}>
          <Typography variant="h2">ورود</Typography>
          <Stack>
            <Typography>نام کاربری :</Typography>
            <FormInput name="username" placeholder="Amir123" />
          </Stack>
          <Stack>
            <Typography>رمز :</Typography>
            <FormInput name="password" placeholder="@Amir1010!" />
          </Stack>
          <Stack>
            <Button
              sx={{
                width: "100%",
                background: "rgb(143, 143, 143)",
                color:'rgb(255,255,255)'
              }}
              type="submit"
            >
              ورود
            </Button>
          </Stack>
          <Stack>
            <Typography onClick={handleAcc}>اکانت ندارید ؟ ثبت نام کنید .</Typography>
          </Stack>
        </Stack>
      </Formik>
    </Stack>
  );
}
