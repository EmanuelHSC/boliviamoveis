import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from "@mui/material";
import PropTypes from "prop-types";

function LoginModal({ open, onClose, onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleChangePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = () => {
    onLogin(email, password);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Entrar</DialogTitle>
      <DialogContent>
        <TextField
          margin="dense"
          label="Email"
          type="email"
          fullWidth
          variant="outlined"
          value={email}
          onChange={handleChangeEmail}
          InputProps={{ style: { color: '#000' } }}
        />
        <TextField
          margin="dense"
          label="Senha"
          type="password"
          fullWidth
          variant="outlined"
          value={password}
          onChange={handleChangePassword}
          InputProps={{ style: { color: '#000' } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Entrar</Button>
      </DialogActions>
    </Dialog>
  );
}

LoginModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onLogin: PropTypes.func.isRequired,
};

export default LoginModal;
