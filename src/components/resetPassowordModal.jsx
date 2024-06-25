import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import PropTypes from "prop-types";
import api from "../api/api";

function ResetPasswordModal({ open, onClose }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = async () => {
    if (email && newPassword) {
      try {
        await api.post("/forgot_password", {
          email: email,
          password: newPassword,
        });
        alert("Senha atualizada com sucesso!");
        onClose();
      } catch (error) {
        console.error("Erro ao resetar a senha:", error);
        alert("Erro ao resetar a senha. Verifique os dados e tente novamente.");
      }
    } else {
      alert("Preencha todos os campos");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle style={{ color: "black" }}>Resetar Senha</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Email" type="email" fullWidth variant="outlined" value={email} onChange={handleEmailChange} InputProps={{ style: { color: "#000" } }} />
        <TextField margin="dense" label="Nova Senha" type="password" fullWidth variant="outlined" value={newPassword} onChange={handlePasswordChange} InputProps={{ style: { color: "#000" } }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Resetar Senha</Button>
      </DialogActions>
    </Dialog>
  );
}

ResetPasswordModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ResetPasswordModal;
