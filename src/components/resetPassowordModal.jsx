import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import PropTypes from "prop-types";

function ResetPasswordModal({ open, onClose, onResetPassword }) {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setNewPassword(event.target.value);
  };

  const handleSubmit = () => {
    if (email && newPassword) {
      onResetPassword(email, newPassword);
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
  onResetPassword: PropTypes.func.isRequired, // Adicione esta linha
};

export default ResetPasswordModal;
