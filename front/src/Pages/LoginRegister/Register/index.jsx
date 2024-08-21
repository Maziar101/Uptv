import { Button, Stack, Typography, styled, TextField } from "@mui/material";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import React, { useState } from "react";
import Toast from "../../../Components/Toast";
import { useDispatch } from "react-redux";

export default function Register({ handleAcc }) {
  const [toast, setToast] = useState({ type: "info", message: "" });
  const dispatch = useDispatch();

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
      color: "#616163",
      "&::placeholder": {
        color: "#616163",
        opacity: 1,
      },
    },
  }));

  const validationSchema = Yup.object({
    name: Yup.string()
      .min(2, "نام باید حداقل ۲ کاراکتر باشد")
      .required("نام الزامی است"),
    username: Yup.string()
      .min(3, "نام کاربری باید حداقل ۳ کاراکتر باشد")
      .required("نام کاربری الزامی است"),
    password: Yup.string()
      .min(8, "رمز عبور باید حداقل ۸ کاراکتر باشد")
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        "رمز عبور باید شامل حداقل یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد"
      )
      .required("رمز عبور الزامی است"),
  });

  const onSubmit = async (values) => {
    console.log("first");
    console.log(values);
    const res = await fetch(process.env.REACT_APP_BASE_API + '/auth/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (data?.status === 'success') {
      setToast({ type: 'success', message: 'ثبت نام با موفقیت انجام شد، لطفا وارد شوید' });
      alert('ثبت نام با موفقیت انجام شد، لطفا وارد شوید');
      setTimeout(() => {
        handleAcc();
      }, 5000);
    } else {
      setToast({ type: 'error', message: data?.message });
    }
  };

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
            name: "",
            username: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ handleSubmit }) => (
            <Form onSubmit={handleSubmit}>
              <Stack sx={{ gap: "10px", background: "#2A2B38", width: "350px", padding: '24px', borderRadius: '8px' }}>
                <Typography sx={{ fontSize: '3em', textAlign: 'center', fontWeight: '500' }} variant="h2">ثبت نام</Typography>
                <Stack>
                  <Typography>نام :</Typography>
                  <Field as={FormInput} name="name" placeholder="Amir" />
                  <ErrorMessage name="name" component="div" style={{ color: '#FFEBA7' }} />
                </Stack>
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
                      transition:'background .4s',
                      '&:hover': {
                        background: '#5E6681',
                        color: '#FFEBA7',
                        boxShadow: '0 0 4px #5E6681',
                      }
                    }}
                    type="submit"
                  >
                    ثبت نام
                  </Button>
                </Stack>
                <Stack>
                  <Typography sx={{ cursor: 'pointer' , textAlign:'center',marginTop:'4px'}} onClick={handleAcc}>
                    اکانت دارید؟ وارد شوید.
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
