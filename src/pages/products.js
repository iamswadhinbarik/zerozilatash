import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
} from "@mui/material/";
// import Card from "@mui/material/Card";
import Header from "./common/header";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useParams } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const Products = () => {
  const navigate = useNavigate();
  let [allProducts, setAllProducts] = useState([]);
  const { catName } = useParams();

  const getALLProducts = () => {
    axios
      .get(`https://fakestoreapi.com/products/category/${catName}`)
      .then((response) => {
        console.log(response.data);
        allProducts = response.data;
        setAllProducts([...allProducts]);
        console.log("allProducts", allProducts);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (allProducts.length == 0) {
      getALLProducts();
    }
  }, []);

  const handleclick = (productId) => {
    navigate(`/product-details/${productId}`);
  };
  return (
    <React.Fragment>
      <Header />
      <Box style={{ margin: "20px" }}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2}>
            {allProducts.map((Product) => {
              return (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  onClick={() => {
                    handleclick(Product.id);
                  }}
                >
                  <Card sx={{ maxWidth: 345, minHeight: 420 }}>
                    <CardActionArea>
                      <img
                        src={Product.image}
                        style={{
                          width: "280px",
                          height: "280px",
                          textAlign: "center",
                        }}
                      />
                      <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                          ${Product.price}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {Product.title}
                        </Typography>
                      </CardContent>
                    </CardActionArea>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
};
