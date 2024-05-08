import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { createTheme, ThemeProvider, styled, alpha } from "@mui/material/styles";
import PersonIcon from "@mui/icons-material/Person";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import HomeIcon from "@mui/icons-material/Home";
import IconButton from "@mui/material/IconButton";
import { Typography } from "@mui/material";

import React from "react";
import { Link } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: "auto", // Definir largura como automática para ocupar espaço disponível
  minWidth: 500, // Definir um tamanho mínimo
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
  },
}));

const theme = createTheme({
  palette: {
    primary: {
      main: "#000000",
    },
    text: {
      primary: "#ffffff",
    },
  },
});

const StyledToolbar = styled(Toolbar)({
  minHeight: "50px", 
  display: "flex",
  justifyContent: "space-between", 
  alignItems: "center", 
});

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 2), 
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: "all 0.3s ease",
    width: "100%", 
    [theme.breakpoints.up("md")]: {
      width: "30ch", 
    },
  },
}));

export default function NavBar() {
  const handleHomeClick = () => {
    console.log("Home Clicked!");
  };

  const handleFavoritesClick = () => {
    console.log("Favorites Clicked!");
  };

  const handleCartClick = () => {
    console.log("Shopping Cart Clicked!");
  };

  const handleProfileClick = () => {
    console.log("Profile Clicked!");
  };

  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <StyledToolbar>
          <Link to="/">
            <IconButton color="inherit" onClick={handleHomeClick}>
              <HomeIcon />
            </IconButton>
          </Link>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, fontSize: "1.25rem" }} color="textPrimary">
            Bolivia Móveis
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Busque aqui seu produto..." inputProps={{ "aria-label": "search" }} />
          </Search>
          <div>
            <IconButton color="inherit" onClick={handleFavoritesClick}>
              <FavoriteIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleCartClick}>
              <ShoppingCartIcon />
            </IconButton>
            <IconButton color="inherit" onClick={handleProfileClick}>
              <PersonIcon />
            </IconButton>
          </div>
        </StyledToolbar>
      </AppBar>
    </ThemeProvider>
  );
}
