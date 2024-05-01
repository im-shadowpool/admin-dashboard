/* eslint-disable no-unused-vars */
import {
  ArrowDropDownRounded,
  DarkModeOutlined,
  LightModeOutlined,
  Menu as MenuIcon,
  Search,
  SettingsOutlined,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import FlexBetween from "components/flexBetween";
import { setMode } from "state";
import profileImg from "../assets/avatar.jpg";

const Navbar = ({ isSidebarOpen, setIsSidebarOpen, user }) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const isOpen = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      sx={{
        position: "static",
        background: "none",
        boxShadow: "none",
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between" }}>
   
        {/* LEFT SIDE */}
        <FlexBetween>
          <IconButton onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <MenuIcon />
          </IconButton>
          <FlexBetween
            backgroundColor={theme.palette.background.alt}
            borderRadius="9px"
            gap="3rem"
            p="0.1rem 1.5rem"
          >
            <InputBase placeholder="Search" />
            <IconButton>
              <Search />
            </IconButton>
          </FlexBetween>
        </FlexBetween>
        {/* RIGHT SIDE */}
        <FlexBetween  sx={{gap: "0.5rem"}}>
        <FlexBetween>
          <IconButton onClick={() => dispatch(setMode())}>
            {theme.palette.mode === "dark" ? (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>
          <IconButton>
            {/* <img
              src="https://avatars.githubusercontent.com/u/59331810?v=4"
              alt="profile"
              style={{ borderRadius: "50%", width: "30px" }}
            /> */}
            <SettingsOutlined sx={{ fontSize: "25px" }} />
          </IconButton>
        </FlexBetween>
        <FlexBetween>
          <Button
            onClick={handleClick}
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              gap: "1rem",
              textTransform: "none",
            }}
          >
            <Box
              component={"img"}
              alt="userProfile"
              src={profileImg}
              height={"32px"}
              width={"32px"}
              borderRadius={"50%"}
              sx={{ objectFit: "cover" }}
            />
            <Box textAlign={"left"}>
              <Typography
                fontWeight={"bold"}
                fontSize={"0.85rem"}
                sx={{ color: theme.palette.secondary[100] }}
              >
                {user.name}
              </Typography>
              <Typography
                fontSize={"0.75rem"}
                sx={{ color: theme.palette.secondary[200] }}
              >
                {user.occupation}
              </Typography>
            </Box>
            <ArrowDropDownRounded
              sx={{
                color: theme.palette.secondary[300],
                fontSize: "25px",
              }}
            />
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={isOpen}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "center",
            }}
          >
            <MenuItem onClick={handleClose}>Logout</MenuItem>
          </Menu>
        </FlexBetween>
        </FlexBetween>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
