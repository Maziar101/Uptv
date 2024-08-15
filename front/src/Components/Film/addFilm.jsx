import { Autocomplete, Button, Stack, styled, TextField, Typography, Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Toast from '../Toast';
import { Formik, Form, Field } from 'formik';

export default function AddFilm() {
  const [toast, setToast] = useState({ type: 'info', message: 'nothing' });
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState({
    posterX: null,
    posterY: null,
    trailerPath: null,
    FilmPath: null
  });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(process.env.REACT_APP_BASE_API + "/category");
        const data = await res.json();
        setCategories(data?.data?.categories);
      } catch (error) {
        setToast({ type: 'error', message: 'خطا در دریافت دسته‌ها' });
      }
    })();
  }, []);

  const FormStack = styled(Stack)(({ theme }) => ({
    border: '1px solid #fff',
    borderRadius: '4px',
    padding: '12px',
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: 'center'
  }));

  const FormButton = styled(Button)(({ theme, uploaded }) => ({
    gap: '10px',
    display: 'flex',
    flexDirection: 'row-reverse',
    background: uploaded ? '#4caf50' : '#8e1231',
    '&:hover': { background: uploaded ? '#388e3c' : "#6b0922" },
  }));

  const FormInput = styled(TextField)(({ theme }) => ({
    width: '100%',
    borderRadius: '4px',
    color: '#fff',
    "& .MuiOutlinedInput-root": {
      "&::placeholder": {
        color: 'white',
        opacity: 1,
      },
      "& fieldset": {
        borderColor: 'white',
      },
      "&:hover fieldset": {
        borderColor: 'white',
      },
      "&.Mui-focused fieldset": {
        borderColor: 'white',
      },
    },
    '&:hover': {
      border: '1px solid #fff',
    },
    input: {
      color: 'white',
    },
  }));

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setFiles((prevFiles) => ({
      ...prevFiles,
      [type]: file,
    }));
  };

  const onSubmit = async (values) => {
    console.log(files);
    let uploadedFiles = {};
  
    for (const key of Object.keys(files)) {
      if (files[key]) {
        const formData = new FormData();
        formData.append('file', files[key]);
        formData.append('apiField', key);
  
        try {
          const res = await fetch(process.env.REACT_APP_BASE_API + '/upload', {
            method: 'POST',
            headers: {
              'path': 'public/films'
            },
            body: formData
          });
  
          const data = await res.json();
          console.log(data);
          if (data.status === 'success') {
            uploadedFiles[key] = "public/films/" + data?.file[0]?.filename;
            console.log(uploadedFiles);
          } else {
            setToast({ type: 'error', message: 'Upload failed for ' + key });
            return;
          }
        } catch (err) {
          setToast({ type: 'error', message: err.message });
          return;
        }
      } else {
        setToast({ type: 'error', message: 'لطفا همه ی فایل ها را آپلود کنید!' });
        return;
      }
    }
  
    // Sending the film data along with the uploaded file paths to the server
    try {
      if (Object.keys(uploadedFiles).every((key) => uploadedFiles[key])) {
        const res2 = await fetch(process.env.REACT_APP_BASE_API + '/films', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...values,
            ...uploadedFiles
          }),
        });
  
        const data2 = await res2.json();
        console.log(data2);
        if (data2.status === 'success') {
          setToast({ type: 'success', message: 'فیلم با موفقیت ارسال شد!' });
        } else {
          setToast({ type: 'error', message: data2.message });
        }
      } else {
        setToast({ type: 'error', message: '! فایل ها به درستی آپلود نشده اند' });
      }
    } catch (err) {
      setToast({ type: 'error', message: err.message });
    }
  };
  


  return (
    <>
      <Stack sx={{ gap: '24px' }}>
        <Typography variant={'h6'}>اضافه کردن فیلم</Typography>
        <Formik
          initialValues={{
            englishName: '',
            name: '',
            categoriesId: [],
            ageLimit: null,
            rate: null,
            players: '',
            director: '',
            imdbRate: null,
            imdbLink: '',
            time: null,
            about: '',
            filmStory: '',
            year: '',
            like: null,
            dislike: null
          }}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values }) => (
            <Form>
              <Stack sx={{ gap: '16px' }}>
                <Field
                  as={FormInput}
                  name='name'
                  placeholder='نام فارسی'
                />
                <Field
                  as={FormInput}
                  name='englishName'
                  placeholder='نام خارجی'
                />
                <FormStack>
                  <Typography>پوستر عمودی</Typography>
                  <FormButton
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    uploaded={!!files.posterX}
                  >
                    آپلود
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'posterX')}
                      style={{ display: 'none' }}
                      accept=".jpg,.png,.webp"
                    />
                  </FormButton>
                </FormStack>
                <FormStack>
                  <Typography>پوستر افقی</Typography>
                  <FormButton
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    uploaded={!!files.posterY}
                  >
                    آپلود
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'posterY')}
                      style={{ display: 'none' }}
                      accept=".jpg,.png,.webp"
                    />
                  </FormButton>
                </FormStack>
                <FormStack>
                  <Typography>تریلر فیلم</Typography>
                  <FormButton
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    uploaded={!!files.trailerPath}
                  >
                    آپلود
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'trailerPath')}
                      style={{ display: 'none' }}
                      accept=".mp4,.mkv,.mov,.avi"
                    />
                  </FormButton>
                </FormStack>
                <FormStack>
                  <Typography>فایل فیلم</Typography>
                  <FormButton
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    uploaded={!!files.FilmPath}
                  >
                    آپلود
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'FilmPath')}
                      style={{ display: 'none' }}
                      accept=".mp4,.mkv,.mov,.avi"
                    />
                  </FormButton>
                </FormStack>
                <Autocomplete
                  multiple
                  options={categories || []}
                  getOptionLabel={(option) => option.name}
                  onChange={(event, value) => setFieldValue('categoriesId', value.map((category) => category.id))}
                  renderInput={(params) => <FormInput {...params} placeholder='انتخاب دسته‌ بندی ها' />}
                  renderTags={(tagValue, getTagProps) =>
                    tagValue.map((option, index) => (
                      <Chip
                        key={index}
                        label={option.name}
                        {...getTagProps({ index })}
                        sx={{ color: 'white', backgroundColor: '#8e1231' }}
                      />
                    ))
                  }
                />
                <Field
                  as={FormInput}
                  name='ageLimit'
                  placeholder='لیمیت سن'
                />
                <Field
                  as={FormInput}
                  name='rate'
                  placeholder='امتیاز درصدی'
                  type='number'
                />
                <FormStack sx={{ flexDirection: 'column', gap: '10px', boxShadow: '0 0 5px red', border: '1px solid red' }}>
                  <Typography>لطفا با " , " جدا کنید !</Typography>
                  <Field
                    as={FormInput}
                    name='players'
                    placeholder='بازیگران'
                  />
                </FormStack>
                <Field
                  as={FormInput}
                  name='director'
                  placeholder='کارگردان'
                />
                <Field
                  as={FormInput}
                  name='imdbRate'
                  placeholder='امتیاز imdb'
                />
                <Field
                  as={FormInput}
                  name='imdbLink'
                  placeholder='لینک imdb'
                />
                <Field
                  as={FormInput}
                  name='time'
                  placeholder='زمان فیلم ( بر اساس دقیقه )'
                  type='number'
                />
                <Field
                  as={FormInput}
                  name='filmStory'
                  placeholder='داستان فیلم'
                />
                <Field
                  as={FormInput}
                  name='about'
                  placeholder='درباره فیلم'
                />
                <Field
                  as={FormInput}
                  name='year'
                  placeholder='سال ساخت'
                />
                <Field
                  as={FormInput}
                  name='like'
                  placeholder='تعداد لایک'
                  type='number'
                />
                <Field
                  as={FormInput}
                  name='dislike'
                  placeholder='تعداد دیسلایک'
                  type='number'
                />
                <FormButton type='submit' sx={{ color: '#fff' }}>ارسال فیلم</FormButton>
              </Stack>
            </Form>
          )}
        </Formik>
      </Stack>
      {toast && <Toast type={toast.type} message={toast.message} />}
    </>
  );
}
