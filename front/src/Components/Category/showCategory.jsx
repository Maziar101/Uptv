import React, { useEffect, useState } from 'react';
import { Accordion, AccordionDetails, AccordionSummary, Typography, IconButton, Stack } from '@mui/material';
import { ExpandMore as ExpandMoreIcon, Delete as DeleteIcon } from '@mui/icons-material';
import Loader from '../Loader';
import { useSelector } from 'react-redux';
import Toast from '../Toast';

export default function ShowCategory() {
  const [category, setCategory] = useState();
  const [toast, setToast] = useState({ type: 'info', message: 'test message' });
  useEffect(() => {
    (async () => {
      const res = await fetch(process.env.REACT_APP_BASE_API + "/category");
      const data = await res.json();
      setCategory(data?.data?.categories);
    })();
  }, []);

  const categories = category?.filter(cat => cat.submenu && cat.submenu.length > 0).map(({ englishName, name, submenu, slug, _id }) => (
    <Accordion key={slug} sx={{ bgcolor: '#000', color: '#fff' }}>
      <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
        <Typography>{name}</Typography>
      </AccordionSummary>
      <AccordionDetails>
        {submenu.map((sub) => sub && (
          <Stack direction="row" alignItems="center" justifyContent="space-between" key={sub.slug} sx={{ borderBottom: '1px solid #fff', py: 1 }}>
            <Typography>{sub.name}</Typography>
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
