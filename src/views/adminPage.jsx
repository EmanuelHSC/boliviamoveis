import React, { useState, useEffect } from "react";
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Table, TableBody, TableCell, TableHead, TableRow, IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";

import productsList from "../data/products";

function AdminPanel() {
  const [products, setProducts] = useState(JSON.parse(localStorage.getItem("products")) || productsList);
  const [open, setOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
    console.log("Products saved to local storage:", products);
  }, [products]);

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

  const handleSave = () => {
    if (currentProduct.id) {
      setProducts((prev) => prev.map((p) => (p.id === currentProduct.id ? currentProduct : p)));
    } else {
      setProducts((prev) => [...prev, { ...currentProduct, id: prev.length + 1 }]);
    }
    console.log("Products updated:", products); 
    handleClose();
  };
  

  const handleDelete = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
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
        <DialogTitle>{currentProduct?.id ? "Edit Product" : "Add New Product"}</DialogTitle>
        <DialogContent>
          <TextField margin="dense" label="Name" type="text" fullWidth variant="outlined" name="name" value={currentProduct?.name} onChange={handleChange} />
          <TextField margin="dense" label="Description" type="text" fullWidth variant="outlined" name="description" value={currentProduct?.description} onChange={handleChange} />
          <TextField margin="dense" label="Image URL" type="text" fullWidth variant="outlined" name="image" value={currentProduct?.image} onChange={handleChange} />
          <TextField margin="dense" label="Price" type="text" fullWidth variant="outlined" name="price" value={currentProduct?.price} onChange={handleChange} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSave}>Save</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminPanel;
