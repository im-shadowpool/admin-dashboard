import React, { useState } from "react";
import { Box, useMediaQuery } from "@mui/material";
import { Outlet } from "react-router-dom";
import Navbar from "components/Navbar";
import Sidebar from "components/Sidebar";
import { useGetUserQuery } from "state/api";
import { useSelector } from "react-redux";

const Layout = () => {
  const isNotMobile = useMediaQuery("(min-width:600px)"); //Returns True if screen width is greater than 600px
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // console.log(isNotMobile);
  const userId = useSelector((state) => state.global.userId);
  const { data } = useGetUserQuery(userId);
  console.log(data);
  return (
    <Box display={isNotMobile ? "flex" : "block"} width="100%" height="100%">
      <Sidebar
        isNotMobile={isNotMobile}
        drawerWidth="220px"
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <Box>
        <Navbar
          isSidebarOpen={isSidebarOpen}
          setIsSidebarOpen={setIsSidebarOpen}
        />
        <Outlet />
      </Box>
    </Box>
  );
};

export default Layout;
