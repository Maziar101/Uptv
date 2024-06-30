import { ThemeProvider, createTheme } from '@mui/material';
import { Route, Routes, useLocation } from 'react-router-dom';
import Contents from './Pages/Videos';
import UpdateCategory from './Components/Category/updateCategory';
import Header from './Components/Header';
import DeleteCategory from './Components/Category/deleteCategory';
import AdminHome from './Components/Home/adminHome';
import AdminPanel from './Pages/AdminPanel';
import ShowCategory from './Components/Category/showCategory';
import DeleteSeries from './Components/Series/deleteSeries';
import ShowSeries from './Components/Series/showSeries';
import UpdateSeries from './Components/Series/updateSeries';
import UpdateFilm from './Components/Film/updateFilm';
import DeleteFilm from './Components/Film/deleteFilm';
import ShowFilm from './Components/Film/showFilm';
import Home from './Pages/Home';
import Footer from './Components/Footer';
import AddCategory from './Components/Category/addCategory';
import AddFilm from './Components/Film/addFilm';
import AddSeries from './Components/Series/addSeries';

export default function App() {
  const theme = createTheme({
    direction: 'rtl',
  });
  const location = useLocation();
  const isAdminPanel = location.pathname.startsWith('/admin-panel');

  return (
    <>
      <ThemeProvider theme={theme}>
        {!isAdminPanel && <Header />}
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path='/contents/:id/:name' element={<Contents />} />
          <Route path='/admin-panel' element={<AdminPanel />}>
            <Route index element={<AdminHome />} />
            <Route path="/admin-panel/category/show" element={<ShowCategory />} />
            <Route path='/admin-panel/category/add' element={<AddCategory />}/>
            <Route path="/admin-panel/category/update" element={<UpdateCategory />} />
            <Route path="/admin-panel/category/delete" element={<DeleteCategory />} />
            <Route path="/admin-panel/film/show" element={<ShowFilm />} />
            <Route path='/admin-panel/film/add' element={<AddFilm />} />
            <Route path="/admin-panel/film/update" element={<UpdateFilm />} />
            <Route path="/admin-panel/film/delete" element={<DeleteFilm />} />
            <Route path="/admin-panel/series/show" element={<ShowSeries />} />
            <Route path='/admin-panel/series/add' element={<AddSeries />} />
            <Route path="/admin-panel/series/update" element={<UpdateSeries />} />
            <Route path="/admin-panel/series/delete" element={<DeleteSeries />} />
          </Route>
        </Routes>
        {!isAdminPanel && <Footer />}
      </ThemeProvider>
    </>
  );
}
