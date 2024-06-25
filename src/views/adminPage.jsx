import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import api from "../api/api";  // Importe sua instância do axios

function AdminPanel() {
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await api.get("/products");
        setProducts(response.data);
      } catch (error) {
        console.error("Erro ao carregar produtos:", error);
      }
    };

    loadProducts();
  }, []);

  const handleOpen = (product = null) => {
    setCurrentProduct(product ? { ...product } : { name: "", description: "", image: "", price: "" });
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      if (currentProduct.id) {
        // Atualizar produto existente
        await api.put(`/products/${currentProduct.id}`, {
          name: currentProduct.name,
          description: currentProduct.description,
          image: currentProduct.image,
          price: parseFloat(currentProduct.price),
        });
        setProducts((prev) => prev.map((p) => (p.id === currentProduct.id ? currentProduct : p)));
      } else {
        // Adicionar novo produto
        const response = await api.post("/products", {
          name: currentProduct.name,
          description: currentProduct.description,
          image: currentProduct.image,
          price: parseFloat(currentProduct.price),
        });
        setProducts((prev) => [...prev, response.data]);
      }
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
    }
    handleClose();
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products/${id}`);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Erro ao deletar produto:", error);
    }
  };

  return (
    <div>
      <Button startIcon={<AddIcon />} onClick={() => handleOpen()}>
        Adicionar Novo Produto
      </Button>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>Description</TableCell>
            <TableCell>Image</TableCell>
            <TableCell>Price</TableCell>
            <TableCell>Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell>{product.name}</TableCell>
              <TableCell>{product.description}</TableCell>
              <TableCell>
                <img src={product.image} alt={product.name} style={{ width: "50px", height: "50px" }} />
              </TableCell>
              <TableCell>${product.price}</TableCell>
              <TableCell>
                <IconButton onClick={() => handleOpen(product)}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={() => handleDelete(product.id)}>
                  <DeleteIcon />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{currentProduct?.id ? "Editar Produto" : "Adicionar Novo Produto"}</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Nome" type="text" fullWidth variant="outlined" name="name" value={currentProduct?.name} onChange={handleChange} />
          <TextField margin="dense" label="Descrição" type="text" fullWidth variant="outlined" name="description" value={currentProduct?.description} onChange={handleChange} />
          <TextField margin="dense" label="URL da Imagem" type="text" fullWidth variant="outlined" name="image" value={currentProduct?.image} onChange={handleChange} />
          <TextField margin="dense" label="Preço" type="number" fullWidth variant="outlined" name="price" value={currentProduct?.price} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminPanel;
