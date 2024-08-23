import React, { useEffect, useState } from "react";
import Toast from "../Toast";
import { Typography } from "@mui/material";
import { useCookies } from "react-cookie";

export default function UpdateFilm() {
  const [films, setFilms] = useState([]);
  const [toast, setToast] = useState({ type: "info", message: "" });
  const [{ token },setCookies] = useCookies(['token']);

  useEffect(() => {
    (async () => {
      const res = await fetch(process.env.REACT_APP_BASE_API + "/films");
      const data = await res.json();
      console.log(data);
      setFilms(data?.data);
      if (!data?.status === "success") {
        setToast({ type: "error", message: data?.message });
      }
    })();
  }, []);

  const handleUpdate = async()=>{
    try{
      const res = await fetch(process.env.REACT_APP_BASE_API + "/films",{
        method: "PATCH",
        headers:{
          "Content-Type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({})
      });
    }catch(err){
      setToast({type:'error',message:err.message});
    }
  }
  return (
    <>
    <Toast type={toast.type} message={toast.message}/>
    </>
    
  )
}
