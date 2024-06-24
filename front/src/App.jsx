import React from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './Pages/Home';
import { ThemeProvider, createTheme } from '@mui/material';
import Header from './Components/Header';
import Footer from './Components/Footer';
import AdminPanel from './Pages/AdminPanel';
import Contents from './Pages/Videos';
import UpdateCategory from './Components/Category/updateCategory';
import DeleteCategory from './Components/Category/deleteCategory';
import AdminHome from './Components/Home/adminHome';
import ShowCategory from './Components/Category/showCategory';
import DeleteSeries from './Components/Series/deleteSeries';
import ShowSeries from './Components/Series/showSeries';
import UpdateSeries from './Components/Series/updateSeries';
import UpdateFilm from './Components/Film/updateFilm';
import DeleteFilm from './Components/Film/deleteFilm';
import ShowFilm from './Components/Film/showFilm';

export default function App() {
  const theme = createTheme({
    direction: "rtl",
  });

  const location = useLocation();
  const isAdminPanel = location.pathname.startsWith('/admin-panel');

  return (
    <ThemeProvider theme={theme}>
      {!isAdminPanel && <Header />}
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/contents/:id/:name' element={<Contents />} />
        <Route path='/admin-panel' element={<AdminPanel />}>
          <Route index element={<AdminHome/>} />
          <Route path="/admin-panel/category/show" element={<ShowCategory />} />
          <Route path="/admin-panel/category/update" element={<UpdateCategory />} />
          <Route path="/admin-panel/category/delete" element={<DeleteCategory />} />
          <Route path="/admin-panel/film/show" element={<ShowFilm />} />
          <Route path="/admin-panel/film/update" element={<UpdateFilm />} />
          <Route path="/admin-panel/film/delete" element={<DeleteFilm />} />
          <Route path="/admin-panel/series/show" element={<ShowSeries />} />
          <Route path="/admin-panel/series/update" element={<UpdateSeries />} />
          <Route path="/admin-panel/series/delete" element={<DeleteSeries />} />
        </Route>
      </Routes>
      {!isAdminPanel && <Footer />}
    </ThemeProvider>
  );
}
