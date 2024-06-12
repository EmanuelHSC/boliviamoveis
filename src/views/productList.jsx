import React, { useState, useEffect } from "react";
import ProductCard from "../components/productCard";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import { styled } from "@mui/material/styles";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const StyledCard = styled(Card)({
  height: "calc(100vh - 64px)",
  overflowY: "auto",
  boxShadow: "none",
  backgroundColor: "#f5f5f5",
});

function ProductList({ products: productsProp }) {
  const [products, setProducts] = useState([]);
  const location = useLocation();

  useEffect(() => {
    const loadProducts = () => {
      const savedProducts = JSON.parse(localStorage.getItem("products"));
      if (savedProducts) {
        setProducts(savedProducts);
      }
    };

    loadProducts();
  }, [location]);

  const [page, setPage] = useState(1);
  const itemsPerPage = 8;

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = products.slice(startIndex, endIndex);

  const handleChange = (event, value) => {
    setPage(value);
  };

  return (
    <StyledCard>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", padding: 2 }}>
        <Typography variant="h3" component="h2" align="center" fontWeight="bold">
          Produtos
        </Typography>
      </Box>
      <Grid container spacing={2} sx={{ padding: 2 }}>
        {currentItems.map((product, index) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={product.id}>
            <ProductCard name={product.name} description={product.description} image={product.image} price={product.price} id={product.id} />
          </Grid>
        ))}
      </Grid>
      <Box sx={{ display: "flex", justifyContent: "center", p: 2 }}>
        <Pagination count={Math.ceil(products.length / itemsPerPage)} page={page} onChange={handleChange} color="primary" />
      </Box>
    </StyledCard>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      price: PropTypes.string,
    })
  ).isRequired,
};

export default ProductList;
