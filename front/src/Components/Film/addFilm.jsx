import { Autocomplete, Button, Stack, styled, TextField, Typography, Chip } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Toast from '../Toast';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { useCookies } from 'react-cookie';

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

const validationSchema = Yup.object({
  englishName: Yup.string().required('نام خارجی الزامی است'),
  name: Yup.string().required('نام فارسی الزامی است'),
  categoriesId: Yup.array().min(1, 'حداقل یک دسته‌بندی انتخاب کنید').required('انتخاب دسته‌بندی الزامی است'),
  ageLimit: Yup.number().nullable().positive('باید یک عدد مثبت باشد').required('لیمیت سن الزامی است'),
  rate: Yup.number().nullable().min(0, 'باید یک عدد بین 0 تا 100 باشد').max(100, 'باید یک عدد بین 0 تا 100 باشد').required('امتیاز درصدی الزامی است'),
  imdbRate: Yup.number()
    .positive('باید یک عدد مثبت باشد')
    .min(0, 'باید یک عدد بین 0 تا 100 باشد')
    .max(100, 'باید یک عدد بین 0 تا 100 باشد')
    .required('امتیاز IMDB الزامی است'),
  imdbLink: Yup.string().url('لینک معتبر وارد کنید').required('لینک IMDB الزامی است'),
  time: Yup.number().nullable().positive('باید یک عدد مثبت باشد').required('زمان فیلم الزامی است'),
  filmStory: Yup.string().required('داستان فیلم الزامی است'),
  about: Yup.string().required('درباره فیلم الزامی است'),
  year: Yup.number().nullable().positive('باید یک عدد مثبت باشد').required('سال ساخت الزامی است'),
  like: Yup.number().nullable().min(0, 'باید یک عدد مثبت باشد').required('تعداد لایک الزامی است'),
  dislike: Yup.number().nullable().min(0, 'باید یک عدد مثبت باشد').required('تعداد دیسلایک الزامی است'),
});

export default function AddFilm() {
  const [toast, setToast] = useState(null);
  const [{ token }, setCookies] = useCookies(['token']);
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState({
    posterX: null,
    posterY: null,
    backPoster: null,
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

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    setFiles((prevFiles) => ({
      ...prevFiles,
      [type]: file,
    }));
    setToast({ type: 'info', message: `Uploading ${type}...` });
  };

  const onSubmit = async (values, { resetForm }) => {
    let uploadedFiles = {};
    let allFilesUploaded = true;

    for (const key of Object.keys(files)) {
      if (files[key]) {
        const formData = new FormData();
        formData.append('file', files[key]);
        formData.append('apiField', key);
        try {
          const res = await fetch(process.env.REACT_APP_BASE_API + '/upload', {
            method: 'POST',
            headers: {
              'path': `public/films/${values.englishName.split(" ").join("-")}/`,
              authorization: `Bearer ${token}`,
            },
            body: formData
          });

          const data = await res.json();
          if (data.status === 'success') {
            uploadedFiles[key] = `films/${values.englishName.split(" ").join("-")}/` + data?.file[0]?.filename;
            setToast({ type: 'success', message: `${key} uploaded successfully!` });
          } else {
            setToast({ type: 'error', message: `Upload failed for ${key}` });
            allFilesUploaded = false;
          }
        } catch (err) {
          setToast({ type: 'error', message: err.message });
          allFilesUploaded = false;
        }
      } else {
        setToast({ type: 'error', message: `Please upload ${key}!` });
        allFilesUploaded = false;
      }
    }

    if (allFilesUploaded) {
      try {
        const res2 = await fetch(process.env.REACT_APP_BASE_API + '/films', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            ...values,
            ...uploadedFiles
          }),
        });

        const data2 = await res2.json();
        if (data2.status === 'success') {
          setToast({ type: 'success', message: 'فیلم با موفقیت ارسال شد!' });
          resetForm();
        } else {
          setToast({ type: 'error', message: data2.message });
        }
      } catch (err) {
        setToast({ type: 'error', message: err.message });
      }
    } else {
      setToast({ type: 'error', message: '! فایل ها به درستی آپلود نشده اند' });
    }
  };

  return (
    <>
      <Stack sx={{ gap: '24px' }}>
        <Typography variant={'h6'}>اضافه کردن فیلم</Typography>
        <Formik
          initialValues={{
            name: '',
            englishName: '',
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
            year: null,
            like: null,
            dislike: null
          }}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {({ setFieldValue, values, errors, touched }) => (
            <Form>
              <Stack sx={{ gap: '16px' }}>
                <Field
                  as={FormInput}
                  name='name'
                  placeholder='نام فارسی'
                  error={touched.name && !!errors.name}
                  helperText={touched.name && errors.name}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
                />
                <Field
                  as={FormInput}
                  name='englishName'
                  placeholder='نام خارجی'
                  error={touched.englishName && !!errors.englishName}
                  helperText={touched.englishName && errors.englishName}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
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
                  <Typography>پوستر بک گراند</Typography>
                  <FormButton
                    component="label"
                    role={undefined}
                    variant="contained"
                    tabIndex={-1}
                    startIcon={<CloudUploadIcon />}
                    uploaded={!!files.backPoster}
                  >
                    آپلود
                    <input
                      type="file"
                      onChange={(e) => handleFileChange(e, 'backPoster')}
                      style={{ display: 'none' }}
                      accept=".jpg,.png,.webp"
                    />
                  </FormButton>
                </FormStack>
                <Field
                  as={FormInput}
                  name='rate'
                  type="number"
                  placeholder='امتیاز درصدی'
                  error={touched.rate && !!errors.rate}
                  helperText={touched.rate && errors.rate}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
                />
                <Field
                  as={FormInput}
                  name='imdbRate'
                  type="number"
                  placeholder='امتیاز IMDB'
                  error={touched.imdbRate && !!errors.imdbRate}
                  helperText={touched.imdbRate && errors.imdbRate}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
                />
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
                  onChange={(event, value) => setFieldValue('categoriesId', value)}
                  renderInput={(params) => (
                    <FormInput
                      {...params}
                      placeholder='انتخاب دسته‌ بندی ها'
                      error={touched.categoriesId && !!errors.categoriesId}
                      helperText={touched.categoriesId && errors.categoriesId}
                      FormHelperTextProps={{ sx: { textAlign: 'right' } }}
                    />
                  )}
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
                  type='number'
                  placeholder='لیمیت سن'
                  error={touched.ageLimit && !!errors.ageLimit}
                  helperText={touched.ageLimit && errors.ageLimit}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
                />
                <Field
                  as={FormInput}
                  name='players'
                  placeholder='بازیگران'
                  error={touched.players && !!errors.players}
                  helperText={touched.players && errors.players}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
                />
                <Field
                  as={FormInput}
                  name='director'
                  placeholder='کارگردان'
                  error={touched.director && !!errors.director}
                  helperText={touched.director && errors.director}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
                />
                <Field
                  as={FormInput}
                  name='imdbLink'
                  placeholder='لینک imdb'
                  error={touched.imdbLink && !!errors.imdbLink}
                  helperText={touched.imdbLink && errors.imdbLink}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
                />
                <Field
                  as={FormInput}
                  name='time'
                  type='number'
                  placeholder='زمان فیلم ( بر اساس دقیقه )'
                  error={touched.time && !!errors.time}
                  helperText={touched.time && errors.time}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
                />
                <Field
                  as={FormInput}
                  name='filmStory'
                  placeholder='داستان فیلم'
                  error={touched.filmStory && !!errors.filmStory}
                  helperText={touched.filmStory && errors.filmStory}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
                />
                <Field
                  as={FormInput}
                  name='about'
                  placeholder='درباره فیلم'
                  error={touched.about && !!errors.about}
                  helperText={touched.about && errors.about}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
                />
                <Field
                  as={FormInput}
                  name='year'
                  type='number'
                  placeholder='سال ساخت'
                  error={touched.year && !!errors.year}
                  helperText={touched.year && errors.year}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
                />
                <Field
                  as={FormInput}
                  name='like'
                  type='number'
                  placeholder='تعداد لایک'
                  error={touched.like && !!errors.like}
                  helperText={touched.like && errors.like}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
                />
                <Field
                  as={FormInput}
                  name='dislike'
                  type='number'
                  placeholder='تعداد دیسلایک'
                  error={touched.dislike && !!errors.dislike}
                  helperText={touched.dislike && errors.dislike}
                  FormHelperTextProps={{ sx: { textAlign: 'right' } }}
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
