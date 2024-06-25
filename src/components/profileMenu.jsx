import React, { useState } from "react";
import { IconButton, Menu, MenuItem } from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import RegisterModal from "./registerModal";
import LoginModal from "./loginModal";
import ResetPasswordModal from "./resetPassowordModal";
import usersData from "../data/users";
import { Link } from "react-router-dom";
import { REQUIRE_ADMIN } from "../config/config";
import api from "../api/api";

function ProfileMenu() {
  const [anchorEl, setAnchorEl] = useState(null);
  const [user, setUser] = useState({ isLoggedIn: false, name: "Usuário", isAdmin: false });
  const [modalOpen, setModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [resetPasswordModalOpen, setResetPasswordModalOpen] = useState(false);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // Reset Password
  const handleResetPasswordOpen = () => {
    setResetPasswordModalOpen(true);
    handleClose();
  };

  const handleResetPasswordClose = () => {
    setResetPasswordModalOpen(false);
  };

  const handleResetPassword = (email, newPassword) => {
    // Lógica para resetar a senha usando a API pode ser adicionada aqui
    handleResetPasswordClose();
  };

  // Login
  const handleLoginOpen = () => {
    setLoginModalOpen(true);
    handleClose();
  };

  const handleLoginClose = () => {
    setLoginModalOpen(false);
  };

  const handleLogin = async (token, email) => {
    try {
      const response = await api.get("/users");
      const users = response.data;
      const loggedInUser = users.find((user) => user.email === email);
      if (loggedInUser) {
        setUser({ isLoggedIn: true, name: loggedInUser.name, isAdmin: loggedInUser.is_admin });
      }
      localStorage.setItem("access_token", token);
    } catch (error) {
      console.error("Erro ao obter usuários:", error);
    }
  };

  // Register
  const handleRegisterOpen = () => {
    setModalOpen(true);
    handleClose();
  };

  const handleRegisterClose = () => {
    setModalOpen(false);
  };

  const handleRegister = (token) => {
    setUser({ isLoggedIn: true, name: "Usuário", isAdmin: false });
    localStorage.setItem("access_token", token);
    handleRegisterClose();
  };

  // Logout
  const handleLogout = () => {
    setUser({ isLoggedIn: false, name: "Usuário", isAdmin: false });
    localStorage.removeItem("access_token");
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
            {(!REQUIRE_ADMIN || user.isAdmin) && (
              <>
                <MenuItem sx={{ minHeight: "4rem" }} style={{ fontSize: "1rem", color: "black" }}>
                  <Link to="/admin" style={{ textDecoration: "none", color: "inherit" }}>
                    Painel Admin
                  </Link>
                </MenuItem>
                <MenuItem sx={{ minHeight: "4rem" }} style={{ fontSize: "1rem", color: "black" }}>
                  <Link to="/users" style={{ textDecoration: "none", color: "inherit" }}>
                    Administração de Usuários
                  </Link>
                </MenuItem>
              </>
            )}
          </>
        ) : (
          <>
            <MenuItem key="login" onClick={handleLoginOpen} sx={{ minHeight: "4rem" }} style={{ fontSize: "1rem", color: "black" }}>
              Entrar
            </MenuItem>
            <MenuItem key="register" onClick={handleRegisterOpen} sx={{ minHeight: "4rem" }} style={{ fontSize: "1rem", color: "black" }}>
              Registrar
            </MenuItem>
            <MenuItem key="resetPassword" onClick={handleResetPasswordOpen} sx={{ minHeight: "4rem" }} style={{ fontSize: "1rem", color: "black" }}>
              Trocar Senha
            </MenuItem>
          </>
        )}
      </Menu>
      <RegisterModal open={modalOpen} onClose={handleRegisterClose} onRegister={handleRegister} />
      <LoginModal open={loginModalOpen} onClose={handleLoginClose} onLogin={handleLogin} />
      <ResetPasswordModal open={resetPasswordModalOpen} onClose={handleResetPasswordClose} onResetPassword={handleResetPassword} />
    </>
  );
}

export default ProfileMenu;
