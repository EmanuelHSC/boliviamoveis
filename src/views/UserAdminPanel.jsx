import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableHead, TableRow, IconButton, FormControlLabel, Checkbox } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api/api";

function UserAdminPanel() {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const response = await api.get("/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Erro ao carregar usuários:", error);
      }
    };

    loadUsers();
  }, []);

  const handleOpen = (user = null) => {
    setCurrentUser(user ? { ...user } : { name: "", email: "", password: "", isAdmin: false, endereco: "", cidade: "", cep: "", pais: "", telefone: "", cpf: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSave = async () => {
    try {
      if (currentUser.id) {
        // Atualizar usuário existente
        const response = await api.put(`/users/${currentUser.id}`, {
          name: currentUser.name,
          email: currentUser.email,
          is_admin: currentUser.isAdmin,
          endereco: currentUser.endereco,
          cidade: currentUser.cidade,
          cep: currentUser.cep,
          pais: currentUser.pais,
          telefone: currentUser.telefone,
          cpf: currentUser.cpf,
        });
        setUsers((prev) => prev.map((u) => (u.id === currentUser.id ? response.data : u)));
      } else {
        // Adicionar novo usuário
        const response = await api.post("/register", {
          name: currentUser.name,
          email: currentUser.email,
          password: currentUser.password,
          is_admin: currentUser.isAdmin,
          endereco: currentUser.endereco,
          cidade: currentUser.cidade,
          cep: currentUser.cep,
          pais: currentUser.pais,
          telefone: currentUser.telefone,
          cpf: currentUser.cpf,
        });
        setUsers((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error("Erro ao salvar usuário:", error);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/users/${id}`);
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (error) {
      console.error("Erro ao deletar usuário:", error);
    }
  };

  return (
    <div>
      <Button startIcon={<AddIcon />} onClick={() => handleOpen()}>
        Adicionar Novo Usuário
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nome</TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell>Endereço</TableCell>
            <TableCell>Cidade</TableCell>
            <TableCell>CEP</TableCell>
            <TableCell>País</TableCell>
            <TableCell>Telefone</TableCell>
            <TableCell>CPF</TableCell>
            <TableCell>Ações</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.is_admin ? "Sim" : "Não"}</TableCell>
              <TableCell>{user.endereco}</TableCell>
              <TableCell>{user.cidade}</TableCell>
              <TableCell>{user.cep}</TableCell>
              <TableCell>{user.pais}</TableCell>
              <TableCell>{user.telefone}</TableCell>
              <TableCell>{user.cpf}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpen(user)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(user.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentUser?.id ? "Editar Usuário" : "Adicionar Novo Usuário"}</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Nome" type="text" fullWidth variant="outlined" name="name" value={currentUser?.name} onChange={handleChange} />
          <TextField margin="dense" label="Email" type="email" fullWidth variant="outlined" name="email" value={currentUser?.email} onChange={handleChange} />
          {!currentUser?.id && (
            <TextField margin="dense" label="Senha" type="password" fullWidth variant="outlined" name="password" value={currentUser?.password} onChange={handleChange} />
          )}
          <FormControlLabel
            control={<Checkbox checked={currentUser?.isAdmin} onChange={handleChange} name="isAdmin" />}
            label="Admin"
          />
          <TextField margin="dense" label="Endereço" type="text" fullWidth variant="outlined" name="endereco" value={currentUser?.endereco} onChange={handleChange} />
          <TextField margin="dense" label="Cidade" type="text" fullWidth variant="outlined" name="cidade" value={currentUser?.cidade} onChange={handleChange} />
          <TextField margin="dense" label="CEP" type="text" fullWidth variant="outlined" name="cep" value={currentUser?.cep} onChange={handleChange} />
          <TextField margin="dense" label="País" type="text" fullWidth variant="outlined" name="pais" value={currentUser?.pais} onChange={handleChange} />
          <TextField margin="dense" label="Telefone" type="text" fullWidth variant="outlined" name="telefone" value={currentUser?.telefone} onChange={handleChange} />
          <TextField margin="dense" label="CPF" type="text" fullWidth variant="outlined" name="cpf" value={currentUser?.cpf} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default UserAdminPanel;
