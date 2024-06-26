import { Stack, TextField, Button, Autocomplete, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';

const categories = [
  { title: 'دسته ۱' },
  { title: 'دسته ۲' },
  { title: 'دسته ۳' },
  // ... more categories
];

export default function AddCategory() {
  const [englishName, setEnglishName] = useState('');
  const [name, setName] = useState('');
  const [submenu, setSubmenu] = useState([]);
  const [categories,setCategories] = useState();

  useEffect(()=>{
    (async ()=>{
      const res = await fetch(process.env.REACT_APP_BASE_API+'/category');
      const date = await res.json();
      setCategories(data?.data);
    })();
  },[]);
  const handleFetch = () => {
    
  };

  return (
    <Stack spacing={2}>
      <TextField
        placeholder="نام انگلیسی"
        variant="outlined"
        value={englishName}
        onChange={(e) => setEnglishName(e.target.value)}
        fullWidth
        InputProps={{
          style: { textAlign: 'right', color: 'white' },
          dir: 'rtl',
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&::placeholder': {
              color: 'white',
              opacity: 1,
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
        }}
      />
      <TextField
        placeholder="نام"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        InputProps={{
          style: { textAlign: 'right', color: 'white' },
          dir: 'rtl',
        }}
        sx={{
          '& .MuiOutlinedInput-root': {
            '&::placeholder': {
              color: 'white',
              opacity: 1,
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
        }}
      />
      <Autocomplete
        multiple
        options={categories}
        getOptionLabel={(option) => option.title}
        onChange={(event, newValue) => setSubmenu(newValue)}
        PaperComponent={({ children }) => (
          <Paper sx={{ bgcolor: '#424242', color: 'white' }}>{children}</Paper>
        )}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="outlined"
            placeholder="انتخاب دسته‌بندی‌ها"
            InputProps={{
              ...params.InputProps,
              style: { textAlign: 'right', color: 'white' },
              dir: 'rtl',
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                '&::placeholder': {
                  color: 'white',
                  opacity: 1,
                },
              },
              '& .MuiInputLabel-root': {
                color: 'white',
              },
            }}
          />
        )}
      />
      <Button variant="contained" onClick={handleFetch}>ثبت</Button>
    </Stack>
  );
}
