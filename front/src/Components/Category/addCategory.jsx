import { Stack, TextField, Button, Autocomplete, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Toast from "../Toast";
import { useCookies } from "react-cookie";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

export default function AddCategory() {
  const [categories, setCategories] = useState([]);
  const [toast, setToast] = useState({ type: "info", message: "nothing..." });
  const [cookies, setCookies] = useCookies(['token']);
  const [off, setOff] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(process.env.REACT_APP_BASE_API + "/category");
        const data = await res.json();
        setCategories(data?.data?.categories);
        setToast({ type: "success", message: data?.message });
      } catch (err) {
        setToast({ type: "error", message: err?.message });
      }
    })();
  }, [off]);

  const validationSchema = Yup.object().shape({
    name: Yup.string().required("نام فارسی اجباری است"),
    englishName: Yup.string().required("نام انگلیسی اجباری است")
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      const res = await fetch(process.env.REACT_APP_BASE_API + "/category", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${cookies.token}`,
        },
        body: JSON.stringify(values),
      });
      const data = await res.json();
      if (data.status == 'true') {
        setToast({
          type: "success",
          message: "دسته بندی با موفقیت اضافه شد :)",
        });
        resetForm(); // پاک کردن فرم پس از ثبت موفق
        setOff(!off); // تغییر وضعیت برای فراخوانی مجدد useEffect
      } else {
        setToast({ type: "error", message: data?.message });
      }
    } catch (err) {
      setToast({ type: "error", message: err.message });
    }
  };

  return (
    <>
      <Formik
        initialValues={{ name: "", englishName: "", submenu: [] }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, setFieldValue, errors, touched }) => (
          <Form>
            <Stack spacing={2}>
              <Field
                as={TextField}
                name="name"
                placeholder="نام فارسی"
                error={touched.name && !!errors.name}
                helperText={touched.name && errors.name}
                FormHelperTextProps={{
                  sx: {
                    textAlign: "right",
                    fontSize: "14px", // اندازه متن ارور را 2 پیکسل بزرگتر می‌کند
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: touched.name && errors.name ? "red" : "white",
                    },
                    "&:hover fieldset": {
                      borderColor: touched.name && errors.name ? "red" : "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: touched.name && errors.name ? "red" : "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  input: {
                    color: "white",
                  }
                }}
              />
              <Field
                as={TextField}
                name="englishName"
                placeholder="نام انگلیسی"
                error={touched.englishName && !!errors.englishName}
                helperText={touched.englishName && errors.englishName}
                FormHelperTextProps={{
                  sx: {
                    textAlign: "right",
                    fontSize: "14px",
                  },
                }}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: touched.englishName && errors.englishName ? "red" : "white",
                    },
                    "&:hover fieldset": {
                      borderColor: touched.englishName && errors.englishName ? "red" : "white",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: touched.englishName && errors.englishName ? "red" : "white",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    color: "white",
                  },
                  input: {
                    color: "white",
                  }
                }}
              />
              <Autocomplete
                multiple
                options={categories}
                getOptionLabel={(option) => `${option?.name} (${option?.englishName})`}
                onChange={(e, val) => setFieldValue("submenu", val)}
                isOptionEqualToValue={(option, value) => option._id === value._id}
                value={values.submenu}
                PaperComponent={({ children }) => (
                  <Paper
                    sx={{
                      bgcolor: "#fff",
                      mt: "10px",
                      padding: "10px",
                      borderRadius: "8px",
                      height: "300px",
                      overflowY: "scroll",
                      '::-webkit-scrollbar': { width: "7px" },
                      '::-webkit-scrollbar-track': { background: "#fff" },
                      '::-webkit-scrollbar-thumb': { background: "#000", borderRadius: "5px" },
                      '& .MuiAutocomplete-option': { color: '#000' , transition:'background .4s' , overflowY:'scroll', '&:hover':{bgcolor:'#F88E8A'} }
                    }}
                  >
                    {children || (
                      <p style={{ color: "black" }}>دسته بندی ای وجود ندارد</p>
                    )}
                  </Paper>
                )}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="outlined"
                    placeholder="انتخاب زیر منو ها"
                    inputProps={{
                      ...params.inputProps,
                      style: { textAlign: "right", color: "#fff" },
                      dir: "rtl",
                    }}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&::placeholder": {
                          color: "#fff",
                          opacity: 1,
                        },
                        "& fieldset": {
                          borderColor: "#fff",
                        },
                        "&:hover fieldset": {
                          borderColor: "#fff",
                        },
                        "&.Mui-focused fieldset": {
                          borderColor: "#fff",
                        },
                      },
                      "& .MuiInputLabel-root": {
                        color: "#000",
                      },
                      "& .MuiAutocomplete-tag": {
                        color: "#000",
                        background: "#fff"
                      },
                      '& .MuiChip-deleteIcon': {
                        color: "#000"
                      },
                      '& .MuiChip-deleteIcon:hover': {
                        color: "#000"
                      },
                      "& .MuiSvgIcon-root": {
                        color: "#fff",
                      }
                    }}
                  />
                )}
              />
              <Button
                sx={{
                  '&.Mui-disabled': {
                    color: '#ddd',
                    borderColor: '#F3738D',
                  },
                  background: '#F3738D',
                  border: "1px solid #F3738D",
                  color: "#000",
                  fontWeight: "bold",
                  '&:hover': { background: '#F3758D', color: "#000" }
                }}
                disabled={!values.englishName || !values.name}
                variant="contained"
                type="submit"
              >
                ثبت
              </Button>
            </Stack>
          </Form>
        )}
      </Formik>
      <Toast type={toast.type} message={toast.message} />
    </>
  );
}
