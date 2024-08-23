import React, { useEffect, useState } from "react";
import Toast from "../Toast";
import { Stack, Typography, Card, CardContent, CardMedia, Grid, Button } from "@mui/material";

export default function ShowFilm() {
  const [films, setFilms] = useState([]);
  const [toast, setToast] = useState({ type: "info", message: "" });

  useEffect(() => {
    (async () => {
      try {
        const res = await fetch(process.env.REACT_APP_BASE_API + "/films");
        const data = await res.json();
        if (data?.status === "success") {
          setFilms(data?.data);
        } else {
          setToast({ type: "error", message: data?.message });
        }
      } catch (error) {
        setToast({ type: "error", message: "مشکلی در بارگذاری فیلم‌ها رخ داد." });
      }
    })();
  }, []);

  return (
    <>
      {films.length > 0 ? (
        <Grid container spacing={2}>
          {films.map((film) => (
            <Grid item xs={12} sm={6} md={4} key={film.id}>
              <Card>
                <CardMedia
                  component="img"
                  height="300"
                  image={process.env.REACT_APP_BASE+film.posterX}
                  alt={film.englishName}
                />
                <CardContent>
                  <Typography variant="h6" component="div">
                    {film.name} ({film.englishName})
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {film.categoriesId.join(", ")}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    محدودیت سنی: {film.ageLimit}+
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    امتیاز: {film.rate}/10
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    کارگردان: {film.director}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    IMDB: {film.imdbRate}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    سال: {film.year}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    مدت زمان: {film.time} دقیقه
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {film.filmStory}
                  </Typography>
                  <Button size="small" href={film.imdbLink} target="_blank" rel="noopener">
                    لینک IMDB
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Typography>فیلمی وجود ندارد !</Typography>
      )}
      <Toast type={toast.type} message={toast.message} />
    </>
  );
}
