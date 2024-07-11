import React, { useEffect, useState } from 'react'
import { Accordion, AccordionDetails, AccordionSummary, Autocomplete, Stack , Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import useFetchApi from '../../utils/FetchApi';
import fetchApi from '../../utils/FetchApi';
import Loader from '../Loader';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


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
      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon/>}>
          <Typography>{name}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          {submenu?submenu.map((sub)=>(
            <Typography>{sub.name}</Typography>
          )):<Typography>No Submenu</Typography>}
        </AccordionDetails>
      </Accordion>
      {/*
      <Stack sx={{border:"1px solid #fff",padding:"10px"}}>
        <Typography>{name}</Typography>
      </Stack> */
      }
    </>
  ));
  return (
    <>
      {category?categories:<Loader/>}
    </>
  )
}
