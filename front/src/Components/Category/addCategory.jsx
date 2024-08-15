import { Stack, TextField, Button, Autocomplete, Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Toast from "../Toast";

export default function AddCategory() {
  const [name, setName] = useState("");
  const [englishName, setEnglishName] = useState("");
  const [submenu, setSubmenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const [toast, setToast] = useState({ type: "info", message: "nothing..." });
  const { token } = useSelector((state) => state.token);
  const [off, setOff] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(process.env.REACT_APP_BASE_API + "/category", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setCategories(data?.data?.categories || []);
        setToast({ type: "success", message: data?.message });
      } catch (err) {
        setToast({ type: "error", message: err?.message });
      }
    })();
  }, [off]);

  const handleAdd = async () => {
    if (name.trim() && englishName.trim()) {
      try {
        console.log(typeof (englishName));
        console.log(submenu)
        const res = await fetch(process.env.REACT_APP_BASE_API + "/category", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            name,
            englishName,
            submenu: submenu,
          }),
        });
        const data = await res.json();
        if (data.status == 'true') {
          setToast({
            type: "success",
            message: "دسته بندی با موفقیت اضافه شد :)",
          });
          setOff(!off); // تغییر وضعیت برای فراخوانی مجدد useEffect
        } else {
          console.log(data?.message);
          setToast({ type: "error", message: data?.message });
        }
        console.log(data)
      } catch (err) {
        console.log(err);
        setToast({ type: "error", message: err.message });
      }
    } else {
      setToast({
        type: "error",
        message: "حداقل باید نام فارسی و انگلیسی رو وارد کنی !",
      });
    }
  };

  return (
    <>
      <Stack spacing={2}>
        <TextField
          sx={{
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
            "& .MuiInputLabel-root": {
              color: "white",
            },
            input: {
              color: "white",
            }
          }}
          required
          onChange={(e) => setName(e.target.value)}
          placeholder="نام فارسی"
        />
        <TextField
          sx={{
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
            "& .MuiInputLabel-root": {
              color: "white",
            },
            input: {
              color: "white",
            }
          }}
          required
          onChange={(e) => setEnglishName(e.target.value)}
          placeholder="نام انگلیسی"
        />
        <Autocomplete
          multiple
          options={categories}
          getOptionLabel={(option) => `${option?.name} (${option?.englishName})`}
          onChange={(e, val) => setSubmenu(val)}
          isOptionEqualToValue={(option, value) => option._id === value._id}
          PaperComponent={({ children }) => (
            <Paper sx={{ bgcolor: "#000", mt: "10px", padding: "10px", color: "#fff", borderRadius: "8px", height: "300px", overflowY: "scroll", '::-webkit-scrollbar': { width: "7px" }, '::-webkit-scrollbar-track': { background: "#000" }, '::-webkit-scrollbar-thumb': { background: "#fff", borderRadius: "5px" }, '& .MuiAutocomplete-option': { color: '#fff' } }}>{children}</Paper>
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
                "& .MuiInputLabel-root": {
                  color: "white",
                },
                "& .MuiAutocomplete-tag": {
                  color: "white",
                  background: "#000"
                },
                '& .MuiChip-deleteIcon': {
                  color: "#fff"
                },
                '& .MuiChip-deleteIcon:hover': {
                  color: "#fff"
                }
              }}
            />
          )}
        />
        <Button sx={{
          '&.Mui-disabled': {
            color: '#ddd',
            borderColor: '#F3738D',
          }, background: '#F3738D', border: "1px solid #F3738D", color: "#000", fontWeight: "bold", '&:hover': { background: '#F3758D', color: "#000" }
        }} disabled={!englishName || !name} variant="contained" onClick={handleAdd}>
          ثبت
        </Button>
      </Stack>
      <Toast type={toast.type} message={toast.message} />
    </>
  );
}
