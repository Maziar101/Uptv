import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { List, ListItemButton, ListItemText, Collapse, Box, Stack, createTheme, ThemeProvider } from '@mui/material';
import AdminHeader from '../../Components/AdminHeader';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/Slices/TokenSlice';

export default function AdminPanel() {
  const [openCategory, setOpenCategory] = useState(false);
  const [openFilm, setOpenFilm] = useState(false);
  const [openSeries, setOpenSeries] = useState(false);
  const Dispatch = useDispatch();

  const handleMenuClick = (menu) => {
    setOpenCategory(menu === 'category' ? !openCategory : false);
    setOpenFilm(menu === 'film' ? !openFilm : false);
    setOpenSeries(menu === 'series' ? !openSeries : false);
  };

  const theme = createTheme({
    direction: 'rtl',
    typography: {
      fontFamily: "Iran",
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <AdminHeader />
      <Stack sx={{ display: 'flex', flexDirection: "row", width: "90%", boxShadow: "0 0 5px gray", margin: "30px auto", padding: "40px 0", background: "#23232B", height: "100vh", borderRadius: "10px", direction: "rtl" }}>
        <Box sx={{ width: "30%", borderLeft: "2px solid gray", height: "96%", textAlign: "right" , padding:"20px"}} component={'nav'}>
          <List component="ul">
            <ListItemButton component={Link} to="/admin-panel">
              <ListItemText primary="خانه" sx={{ textAlign: 'right', color: 'white' }} />
            </ListItemButton>
            <ListItemButton onClick={() => handleMenuClick('category')}>
              <ListItemText primary="دسته بندی ( Category )" sx={{ textAlign: 'right', color: 'white' }} />
              {openCategory ? <ExpandLess sx={{ color: '#F3708D' }} /> : <ExpandMore sx={{ color: 'white' }} />}
            </ListItemButton>
            <Collapse in={openCategory} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pr: 4 , background:"#1C1C22" , '&:hover':{background:"#17171C"}}} component={Link} to="/admin-panel/category/show">
                  <ListItemText primary="نمایش" sx={{ textAlign: 'right', color: 'white' ,'&:hover':{color:"#FA9C88"}}} />
                </ListItemButton>
                <ListItemButton sx={{ pr: 4 , background:"#1C1C22" , '&:hover':{background:"#17171C"}}} component={Link} to="/admin-panel/category/add">
                  <ListItemText primary="افزودن" sx={{ textAlign: 'right', color: 'white' ,'&:hover':{color:"#FA9C88"}}} />
                </ListItemButton>
                <ListItemButton sx={{ pr: 4 , background:"#1C1C22" , '&:hover':{background:"#17171C"}}} component={Link} to="/admin-panel/category/update">
                  <ListItemText primary="آپدیت" sx={{ textAlign: 'right', color: 'white' ,'&:hover':{color:"#FA9C88"}}} />
                </ListItemButton>
                <ListItemButton sx={{ pr: 4 , background:"#1C1C22" , '&:hover':{background:"#17171C"}}} component={Link} to="/admin-panel/category/delete">
                  <ListItemText primary="حذف" sx={{ textAlign: 'right', color: 'white' ,'&:hover':{color:"#FA9C88"}}} />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={() => handleMenuClick('film')}>
              <ListItemText primary="فیلم" sx={{ textAlign: 'right', color: 'white' }} />
              {openFilm ? <ExpandLess sx={{ color: '#F3708D' }} /> : <ExpandMore sx={{ color: 'white' }} />}
            </ListItemButton>
            <Collapse in={openFilm} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pr: 4 , background:"#1C1C22" , '&:hover':{background:"#17171C"}}} component={Link} to="/admin-panel/film/show">
                  <ListItemText primary="نمایش" sx={{ textAlign: 'right', color: 'white' ,'&:hover':{color:"#FA9C88"}}} />
                </ListItemButton>
                <ListItemButton sx={{ pr: 4 , background:"#1C1C22" , '&:hover':{background:"#17171C"}}} component={Link} to="/admin-panel/film/add">
                  <ListItemText primary="افزودن" sx={{ textAlign: 'right', color: 'white' ,'&:hover':{color:"#FA9C88"}}} />
                </ListItemButton>
                <ListItemButton sx={{ pr: 4 , background:"#1C1C22" , '&:hover':{background:"#17171C"}}} component={Link} to="/admin-panel/film/update">
                  <ListItemText primary="آپدیت" sx={{ textAlign: 'right', color: 'white' ,'&:hover':{color:"#FA9C88"}}} />
                </ListItemButton>
                <ListItemButton sx={{ pr: 4 , background:"#1C1C22" , '&:hover':{background:"#17171C"}}} component={Link} to="/admin-panel/film/delete">
                  <ListItemText primary="حذف" sx={{ textAlign: 'right', color: 'white' ,'&:hover':{color:"#FA9C88"}}} />
                </ListItemButton>
              </List>
            </Collapse>

            <ListItemButton onClick={() => handleMenuClick('series')}>
              <ListItemText primary="سریال" sx={{ textAlign: 'right', color: 'white' }} />
              {openSeries ? <ExpandLess sx={{ color: '#F3708D' }} /> : <ExpandMore sx={{ color: 'white' }} />}
            </ListItemButton>
            <Collapse in={openSeries} timeout="auto" unmountOnExit>
              <List component="div" disablePadding>
                <ListItemButton sx={{ pr: 4 , background:"#1C1C22" , '&:hover':{background:"#17171C"}}} component={Link} to="/admin-panel/series/show">
                  <ListItemText primary="نمایش" sx={{ textAlign: 'right', color: 'white' ,'&:hover':{color:"#FA9C88"}}} />
                </ListItemButton>
                <ListItemButton sx={{ pr: 4 , background:"#1C1C22" , '&:hover':{background:"#17171C"}}} component={Link} to="/admin-panel/series/add">
                  <ListItemText primary="افزودن" sx={{ textAlign: 'right', color: 'white' ,'&:hover':{color:"#FA9C88"}}} />
                </ListItemButton>
                <ListItemButton sx={{ pr: 4 , background:"#1C1C22" , '&:hover':{background:"#17171C"}}} component={Link} to="/admin-panel/series/update">
                  <ListItemText primary="آپدیت" sx={{ textAlign: 'right', color: 'white','&:hover':{color:"#FA9C88"} }} />
                </ListItemButton>
                <ListItemButton sx={{ pr: 4 , background:"#1C1C22",'&:hover':{background:"#17171C"}}} component={Link} to="/admin-panel/series/delete">
                  <ListItemText primary="حذف" sx={{ textAlign: 'right', color: 'white', '&:hover':{color:"#FA9C88"}}} />
                </ListItemButton>
              </List>
            </Collapse>
            <ListItemButton component={Link}>
              <ListItemText primary="خروج از اکانت" onClick={()=>Dispatch(logout)} sx={{ textAlign: 'right', color: '#F88E8A' }} />
            </ListItemButton>
          </List>
        </Box>
        <Stack sx={{ width: "70%", padding: "20px", color: "white", marginLeft: '20px' }}>
          <Outlet />
        </Stack>
      </Stack>
    </ThemeProvider>
  );
};