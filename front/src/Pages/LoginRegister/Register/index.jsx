import { Stack , Typography } from '@mui/material'
import { Formik } from 'formik'
import React from 'react'

export default function Register() {
  return (
    <Stack sx={{
      width:"100%",
      height:"100vh",
      justifyContent:"center",
      alignItems:"center",
    }}>
      <Formik initialValues={{}}>

      </Formik>
    </Stack>
  )
}
