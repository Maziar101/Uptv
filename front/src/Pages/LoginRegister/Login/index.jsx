import { Button, Stack, TextField, Typography, styled } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import Toast from "../../../Components/Toast";
import { useDispatch } from "react-redux";
import { CookiesProvider, useCookies } from "react-cookie";
import { login } from "../../../store/Slices/TokenSlice";

export default function Login({ handleAcc }) {

  const [cookies, setCookies] = useCookies(['name', 'role', 'token']);

  // set Token And Name And Role
  const [toast, setToast] = useState({ type: "info", message: "" });
  const dispatch = useDispatch();

  const onSubmit = async (values) => {
    console.log(values);

    try {
      const res = await fetch(process.env.REACT_APP_BASE_API + '/auth', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data?.token){
        setToast({type:'success',message:'خوش آمدید'});
        setCookies('token', data?.token, { path: '/' });
        setCookies('role', data?.role, { path: '/' });
        setCookies('name', data?.name, { path: '/' });
        window.localStorage.setItem('token',data?.token);
        window.localStorage.setItem('role',data?.role);
        window.localStorage.setItem('name',data?.name);
        dispatch(login({token:data?.token,role:data?.role,name:data?.name}));
        console.log(data)
      }else{
        console.log(data);
      };
    } catch (err) {
      setToast({type:'error',message:err.message});
    }
  };

  const FormInput = styled(TextField)(({ theme }) => ({
    width: "100%",
    background: "#1F2029",
    borderRadius: "4px",
    color: 'white',
    margin: '8px auto',
    "& .MuiOutlinedInput-root": {
      "&::placeholder": {
        color: "white",
        opacity: 1,
      },
      "& fieldset": {
        borderColor: "none",
      },
      "&:hover fieldset": {
        borderColor: "none",
      },
      "&.Mui-focused fieldset": {
        borderColor: "none",
      },
    },
    "& .MuiInputBase-input": {
      color: "#fff",
      "&::placeholder": {
        color: "#616163",
        opacity: 1,
      },
    },
  }));

  const validationSchema = Yup.object({
    username: Yup.string()
      .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
      .required("نام کاربری الزامی است"),
    password: Yup.string()
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
        "رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد"
      )
      .required("رمز عبور الزامی است"),
  });

  return (
    <>
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
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Stack sx={{ gap: "10px", background: "#2A2B38", width: "350px", padding: '24px', borderRadius: '8px' }}>
                <Typography sx={{ fontSize: '3em', textAlign: 'center', fontWeight: '500' }} variant="h2">ورود</Typography>
                <Stack>
                  <Typography>نام کاربری :</Typography>
                  <Field as={FormInput} name="username" placeholder="Amir123" />
                  <ErrorMessage name="username" component="div" style={{ color: '#FFEBA7' }} />
                </Stack>
                <Stack>
                  <Typography>رمز :</Typography>
                  <Field as={FormInput} name="password" placeholder="@Amir1010!" type="password" />
                  <ErrorMessage name="password" component="div" style={{ color: '#FFEBA7' }} />
                </Stack>
                <Stack>
                  <Button
                    sx={{
                      width: "100%",
                      background: "#FFEBA7",
                      color: "#5E6681",
                      fontSize: '18px',
                      boxShadow: '0 0 4px #FFEBA7',
                      transition: 'background .4s',
                      '&:hover': {
                        background: '#5E6681',
                        color: '#FFEBA7',
                        boxShadow: '0 0 4px #5E6681',
                      }
                    }}
                    type="submit"
                  >
                    ورود
                  </Button>
                </Stack>
                <Stack>
                  <Typography sx={{ cursor: 'pointer', textAlign: 'center', marginTop: '4px' }} onClick={handleAcc}>
                    اکانت ندارید ؟ یکی بسازید !
                  </Typography>
                </Stack>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
      <Toast type={toast.type} message={toast.message} />
    </>
  );
}
