import React from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled, alpha } from "@mui/material/styles";

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
      main: "#000000", // cor preta
    },
    text: {
      primary: "#ffffff", // cor branca
    },
  },
});

const StyledToolbar = styled(Toolbar)({
  minHeight: "50px", // Defina a altura mínima desejada aqui
  display: "flex",
  justifyContent: "space-between", // Distribui o espaço uniformemente entre os itens
  alignItems: "center", // Alinha os itens verticalmente no centro
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
    padding: theme.spacing(1, 2), // Aumentar o padding horizontal
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: "all 0.3s ease",
    width: "100%", // Manter largura adaptável
    [theme.breakpoints.up("md")]: {
      width: "30ch", // Aumentar a largura fixa em telas maiores
    },
  },
}));

export default function NavBar() {
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" color="primary">
        <StyledToolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, display: { xs: "none", sm: "block" }, fontSize: "1.25rem" }} color="textPrimary">
            Bolívia Móveis
          </Typography>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Busque aqui seu produto..." inputProps={{ "aria-label": "search" }} />
          </Search>
          <div style={{ flexGrow: 1 }} /> {/* Para manter o equilíbrio visual */}
        </StyledToolbar>
      </AppBar>
    </ThemeProvider>
  );
}
