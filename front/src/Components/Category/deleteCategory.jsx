import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, IconButton, Stack } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import Toast from '../Toast';

export default function DeleteCategory() {
  const [category, setCategory] = useState();
  const [toast, setToast] = useState({ type: 'info', message: 'test message' });
  const { token } = useSelector((state) => state.token);

  useEffect(() => {
    (async () => {
      const res = await fetch(process.env.REACT_APP_BASE_API + "/category");
      const data = await res.json();
      setCategory(data?.data?.categories);
    })();
  }, []);

  const handleDeleteCat = async (catId) => {
    try {
      const res = await fetch(process.env.REACT_APP_BASE_API + `/category/${catId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data?.status === "success") {
        setToast({ type: 'success', message: 'SubCategory deleted successfully' });
        location.reload();
      } else {
        console.log(data);
        setToast({ type: 'error', message: 'Something went wrong' });
      }
    } catch (err) {
      setToast({ type: "error", message: err.message });
    };
  };

  const handleDeleteSub = async (catId, subId) => {
    try {
      const res = await fetch(process.env.REACT_APP_BASE_API + `/category/delete-sub/${catId}/${subId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "authorization": `Bearer ${token}`
        }
      });
      const data = await res.json();
      if (data?.status === "success") {
        setToast({ type: 'success', message: 'SubCategory deleted successfully' });
        location.reload();
      } else {
        console.log(data);
        setToast({ type: 'error', message: 'Something went wrong' });
      }
    } catch (err) {
      setToast({ type: "error", message: err.message });
    };
  };

  const categories = category?.filter(cat => cat.submenu && cat.submenu.length > 0).map(({ englishName, name, submenu, slug, _id }) => (
    <Accordion key={slug} sx={{ bgcolor: '#000', color: '#fff' }}>
      <AccordionSummary sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" , '& .css-eqpfi5-MuiAccordionSummary-content':{alignItems:"center",justifyContent:"space-between"}}} expandIcon={<ExpandMoreIcon sx={{ color: '#fff', fontSize: "35px" }} />}>
        <Typography>{name}</Typography>
        <IconButton onClick={() => handleDeleteCat(_id)} sx={{ color: '#fff' }}>
          <DeleteIcon />
        </IconButton>
      </AccordionSummary>
      <AccordionDetails>
        {submenu.map((sub) => sub && (
          <Stack direction="row" alignItems="center" justifyContent="space-between" key={sub.slug} sx={{ borderBottom: '1px solid #fff', py: 1 }}>
            <Typography>{sub.name}</Typography>
            <IconButton onClick={() => handleDeleteSub(_id, sub._id)} sx={{ color: '#fff' }}>
              <DeleteIcon />
            </IconButton>
          </Stack>
        ))}
      </AccordionDetails>
    </Accordion>
  ));

  return (
    <>
      {category ? categories : <Loader />}
      <Toast type={toast.type} message={toast.message} />
    </>
  );
}
