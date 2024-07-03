import { Stack, TextField, Button, Autocomplete, Paper } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

export default function AddCategory() {
  const [englishName, setEnglishName] = useState('');
  const [name, setName] = useState('');
  const [submenu, setSubmenu] = useState([]);
  const [categories, setCategories] = useState([]);
  const { token } = useSelector((state) => state.token);
  const [error, setError] = useState({ englishName: false, name: false });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(process.env.REACT_APP_BASE_API + '/category');
        const data = await res.json();
        console.log(data); // اضافه کردن کنسول لاگ
        setCategories(data?.data || []);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    })();
  }, []);

  const handleFetch = async () => {
    if (!englishName || !name) {
      setError({ englishName: !englishName, name: !name });
      return;
    }

    try {
      const res = await fetch(process.env.REACT_APP_BASE_API + '/category', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          englishName,
          name,
          submenu
        })
      });
      const data = await res.json();
      if (res.ok) {
        // عملیات موفق بود
        console.log('Category added successfully:', data);
      } else {
        // خطا در عملیات
        console.error('Error adding category:', data);
      }
    } catch (error) {
      console.error('Error in handleFetch:', error);
    }
  };

  return (
    <Stack spacing={2}>
      <TextField
        required
        placeholder="نام انگلیسی"
        variant="outlined"
        value={englishName}
        onChange={(e) => setEnglishName(e.target.value)}
        fullWidth
        error={error.englishName}
        helperText={error.englishName ? 'این فیلد ضروری است' : ''}
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
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
            },
          },
          '& .MuiInputLabel-root': {
            color: 'white',
          },
        }}
      />
      <TextField
        required
        placeholder="نام"
        variant="outlined"
        value={name}
        onChange={(e) => setName(e.target.value)}
        fullWidth
        error={error.name}
        helperText={error.name ? 'این فیلد ضروری است' : ''}
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
            '& fieldset': {
              borderColor: 'white',
            },
            '&:hover fieldset': {
              borderColor: 'white',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'white',
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
          <Paper sx={{ bgcolor: '#fff', color: 'white' }}>{children}</Paper>
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
                '& fieldset': {
                  borderColor: 'white',
                },
                '&:hover fieldset': {
                  borderColor: 'white',
                },
                '&.Mui-focused fieldset': {
                  borderColor: 'white',
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
