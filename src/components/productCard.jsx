import React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";

function ProductCard({ name = "Default Name", description = "Default Description", image, price = "0.00" }) {
  console.log("Props em ProductCard:", { name, description, image, price });

  return (
    <Card sx={{ maxWidth: 345, m: 2 }}>
      <CardMedia component="img" sx={{ height: "100%" }} image={image || "https://via.placeholder.com/150"} alt={name} />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
        <Typography variant="bo dy1" color="text.primary">
          R${price}
        </Typography>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  price: PropTypes.string,
};

export default ProductCard;