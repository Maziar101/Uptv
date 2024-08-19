import React, { useEffect, useState } from "react";
import Toast from "../Toast";
import { Typography } from "@mui/material";

export default function ShowFilm() {
  const [films, setFilms] = useState([]);
  const [toast, setToast] = useState({ type: "info", message: "" });

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

  return (
    <>
      {films ? (
        <>
          <Stack>

          </Stack>
        </>
      ) : (
        <Typography>فیلمی وجود ندارد !</Typography>
      )}
      <Toast type={toast.type} message={toast.message} />
    </>
  )
}
