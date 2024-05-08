import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import LoginModal from "./loginModal";
import usersData from "../data/users";
import { Link } from "react-router-dom";

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({ isLoggedIn: false, name: "Usuário", isAdmin: false });
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [users, setUsers] = useState(usersData);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //Reset Password

  //Login

  const handleLoginOpen = () => {
    setLoginModalOpen(true);
    handleClose();
  };

  const handleLoginClose = () => {
    setLoginModalOpen(false);
  };

  const handleLogin = (email, password) => {
    const userFound = users.find((u) => u.email === email);

    if (!userFound) {
      alert("Este e-mail não existe.");
    } else if (userFound.password !== password) {
      alert("Você errou sua senha, tente novamente ou resete sua senha.");
    } else {
      setUser({ isLoggedIn: true, name: userFound.name, isAdmin: userFound.isAdmin });
      handleLoginClose();
    }
  };

  //Register

  //logout

  const handleLogout = () => {
    setUser({ isLoggedIn: false, name: "Usuário", isAdmin: false });
  };

  return (
    <>
      <IconButton color="inherit" aria-controls="profile-menu" aria-haspopup="true" onClick={handleClick} style={{ fontSize: "2rem" }}>
        <PersonIcon style={{ fontSize: "2rem" }} />
      </IconButton>
      <Menu id="profile-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose} sx={{ minWidth: "30rem" }}>
        {user.isLoggedIn ? (
          <>
            <MenuItem onClick={handleLogout} sx={{ minHeight: "4rem" }} style={{ fontSize: "1rem", color: "black" }}>
              Sair
            </MenuItem>
            {user.isAdmin && (
              <MenuItem sx={{ minHeight: "4rem" }} style={{ fontSize: "1rem", color: "black" }}>
                <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
                  Painel Admin
                </Link>
              </MenuItem>
            )}
          </>
        ) : (
          <>
            <MenuItem key="login" onClick={handleLoginOpen} sx={{ minHeight: "4rem" }} style={{ fontSize: "1rem", color: "black" }}>
              Entrar
            </MenuItem>
          </>
        )}
      </Menu>
      <LoginModal open={loginModalOpen} onClose={handleLoginClose} onLogin={handleLogin} />
    </>
  );
}

export default ProfileMenu;
