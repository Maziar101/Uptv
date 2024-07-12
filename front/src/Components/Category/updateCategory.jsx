import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, IconButton, Stack, TextField, Button } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Save as SaveIcon } from '@mui/icons-material';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import Toast from '../Toast';

export default function UpdateCategory() {
  const [categories, setCategories] = useState([]);
  const [toast, setToast] = useState({ type: 'info', message: 'something' });
  const { token } = useSelector((state) => state.token);

  useEffect(() => {
    (async () => {
      const res = await fetch(process.env.REACT_APP_BASE_API + "/category");
      const data = await res.json();
      setCategories(data?.data?.categories || []);
    })();
  }, []);

  const handleUpdate = async (catId, updatedSub) => {
    try {
      const res = await fetch(process.env.REACT_APP_BASE_API + `/category/update-sub/${catId}/${updatedSub._id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ name: updatedSub.name })
      });
      const data = await res.json();
      if (data?.status === "success") {
        setToast({ type: 'success', message: 'SubCategory updated successfully' });
      } else {
        setToast({ type: 'error', message: 'Something went wrong' });
      }
    } catch (err) {
      setToast({ type: "error", message: err.message });
    };
  };

  const handleInputChange = (catId, subId, event) => {
    setCategories(prevCategories =>
      prevCategories.map(category =>
        category._id === catId
          ? {
              ...category,
              submenu: category.submenu.map(sub =>
                sub._id === subId
                  ? { ...sub, name: event.target.value }
                  : sub
              )
            }
          : category
      )
    );
  };

  return (
    <>
      {categories.length > 0 ? categories.filter(cat => cat.submenu && cat.submenu.length > 0).map(({ name, submenu, slug, _id }) => (
        <Accordion key={slug} sx={{ bgcolor: '#000', color: '#fff' }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff', fontSize: "35px" }} />}>
            <Typography>{name}</Typography>
          </AccordionSummary>
          <AccordionDetails>
            {submenu.map((sub) => sub && (
              <Stack direction="row" alignItems="center" justifyContent="space-between" key={sub.slug} sx={{ borderBottom: '1px solid #fff', py: 1 }}>
                <TextField
                  value={sub.name}
                  onChange={(event) => handleInputChange(_id, sub._id, event)}
                  variant="outlined"
                  size="small"
                  sx={{ bgcolor: '#fff', borderRadius: '4px' }}
                />
                <IconButton onClick={() => handleUpdate(_id, sub)} sx={{ color: '#fff' }}>
                  <SaveIcon />
                </IconButton>
              </Stack>
            ))}
          </AccordionDetails>
        </Accordion>
      )) : <Loader />}
      <Toast type={toast.type} message={toast.message} />
    </>
  );
}
