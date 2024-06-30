import { Stack } from "@mui/material";
import React, { useEffect, useState } from "react";

export default function Home() {
  const [films,setFilms] = useState();
  useEffect(()=>{
    (async()=>{
      const res = await fetch(process.env.REACT_APP_BASE_API+"/film");
      const data = await res.json();
      setFilms(data?.data);
    })();
  },[]);
  // const popularFilmList = films?.slice(0,12)?.map((pop)=>(
  //   <>
  //     <Stack>
  //       <img src={pop?.posterX} alt={pop?.slug} />
  //     </Stack>
  //   </>
  // ));

  return (
    <>
      <Stack
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xl: "auto auto auto auto",
            lg: "auto auto auto",
            md: "auto auto",
            sm: "auto auto",
            xs: "auto auto",
          },
        }}
      >
        {''}
      </Stack>
    </>
  );
}
