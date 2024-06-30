import React, { useEffect, useState } from 'react'
import { Stack , Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useFetchApi from '../../utils/FetchApi';
import fetchApi from '../../utils/FetchApi';


export default function ShowCategory() {
  const [category,setCategory] = useState();
  useEffect(()=>{
    (async()=>{
      const res = await fetch(process.env.REACT_APP_BASE_API+"/category");
      const data = await res.json();
      setCategory(data?.data?.categories);
    })();
  },[]);
  const categories = category?.map(({englishName,name,submenu,slug})=>(
    <>
      <Stack>
        <Typography>{name}</Typography>
      </Stack>
    </>
  ));
  return (
    <>
      {category&&categories}
    </>
  )
}
