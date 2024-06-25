import React, { useState } from "react";
import { Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button, Checkbox, FormControlLabel } from "@mui/material";
import PropTypes from "prop-types";
import api from "../api/api";

function RegisterModal({ open, onClose, onRegister }) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
    endereco: "",
    cidade: "",
    cep: "",
    pais: "",
    telefone: "",
    cpf: "",
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const response = await api.post("/register", {
        name: formData.name,
        email: formData.email,
        password: formData.password,
        is_admin: formData.isAdmin,
        endereco: formData.endereco,
        cidade: formData.cidade,
        cep: formData.cep,
        pais: formData.pais,
        telefone: formData.telefone,
        cpf: formData.cpf,
      });

      const { access_token } = response.data;
      localStorage.setItem("access_token", access_token);
      onRegister(access_token);
      onClose();
    } catch (error) {
      console.error("Erro ao registrar:", error);
      alert("Erro ao registrar. Verifique os dados e tente novamente.");
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Registrar</DialogTitle>
      <DialogContent>
        <TextField margin="dense" label="Nome" type="text" fullWidth variant="outlined" name="name" value={formData.name} onChange={handleChange} InputProps={{ style: { color: "#000" } }} />
        <TextField margin="dense" label="Email" type="email" fullWidth variant="outlined" name="email" value={formData.email} onChange={handleChange} InputProps={{ style: { color: "#000" } }} />
        <TextField margin="dense" label="Senha" type="password" fullWidth variant="outlined" name="password" value={formData.password} onChange={handleChange} InputProps={{ style: { color: "#000" } }} />
        
        <TextField margin="dense" label="Endereço" type="text" fullWidth variant="outlined" name="endereco" value={formData.endereco} onChange={handleChange} InputProps={{ style: { color: "#000" } }} />
        <TextField margin="dense" label="Cidade" type="text" fullWidth variant="outlined" name="cidade" value={formData.cidade} onChange={handleChange} InputProps={{ style: { color: "#000" } }} />
        <TextField margin="dense" label="CEP" type="number" fullWidth variant="outlined" name="cep" value={formData.cep} onChange={handleChange} InputProps={{ style: { color: "#000" } }} />
        <TextField margin="dense" label="País" type="text" fullWidth variant="outlined" name="pais" value={formData.pais} onChange={handleChange} InputProps={{ style: { color: "#000" } }} />
        <TextField margin="dense" label="Telefone" type="number" fullWidth variant="outlined" name="telefone" value={formData.telefone} onChange={handleChange} InputProps={{ style: { color: "#000" } }} />
        <TextField margin="dense" label="CPF" type="number" fullWidth variant="outlined" name="cpf" value={formData.cpf} onChange={handleChange} InputProps={{ style: { color: "#000" } }} />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancelar</Button>
        <Button onClick={handleSubmit}>Registrar</Button>
      </DialogActions>
    </Dialog>
  );
}

RegisterModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onRegister: PropTypes.func.isRequired,
};

export default RegisterModal;
