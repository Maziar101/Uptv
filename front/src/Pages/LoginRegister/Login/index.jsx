import { Stack } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'

export default function Login() {

  const onSubmit = async ()=>{

  };

  return (
    <Stack sx={{ width:"100%",height:"100vh", justifyContent:'center',alignItems:'center' }}>
      <Formik initialValues={{
        name: '',
        username: '',
        password: '',
      }}>
        <Stack sx={{gap:'10px'}}>
        
        </Stack>
      </Formik>
    </Stack>
  )
}
