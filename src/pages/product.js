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
  Button,
} from "@mui/material/";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { setCart } from "../redux/actions/cartAction";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
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

export const ProductDetails = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let { inCart } = useSelector(({ cartReducer }) => cartReducer);
  let [product, setProduct] = useState({});
  const { productId } = useParams();

  const getProduct = () => {
    console.log("test");
    axios
      .get(`https://fakestoreapi.com/products/${productId}`)
      .then((response) => {
        console.log(response.data);
        product = response.data;
        setProduct({ ...product });
        console.log("product", product);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getProduct();
  }, []);

  const handleclick = (product) => {
    let newArray = [...inCart, product];
    dispatch(setCart(newArray));
  };
  return (
    <React.Fragment>
      <Header />
      <Box style={{ margin: "20px" }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4} md={4} lg={4}>
            <img src={product.image} style={{ width: "80%" }} />
          </Grid>
          <Grid item xs={12} sm={8} md={8} lg={8}>
            <CardContent>
              <Typography
                sx={{ fontSize: 20 }}
                color="text.secondary"
                gutterBottom
              >
                {product.category}
              </Typography>
              <Typography
                sx={{ fontSize: 14 }}
                color="text.secondary"
                gutterBottom
              >
                {product.title}
              </Typography>
              <Typography variant="h5" component="div">
                ${product.price}
              </Typography>
              <Typography sx={{ mb: 1.5 }} color="text.secondary">
                Special price
              </Typography>
              <Typography variant="body2">
                <Box
                  sx={{
                    width: 300,
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <Rating
                    name="text-feedback"
                    value={`${product.rating?.rate}`}
                    //value={product.rating && product.rating.rate ? product.rating.rate : '0'}
                    readOnly
                    precision={0.5}
                    emptyIcon={
                      <StarIcon style={{ opacity: 1 }} fontSize="inherit" />
                    }
                  />
                  <Box sx={{ ml: 2 }}>{`${product.rating?.count} Ratings`}</Box>
                </Box>
                <br />
                {product.description}
              </Typography>
              <Button
                variant="contained"
                startIcon={<ShoppingCartIcon />}
                size="large"
                style={{ marginTop: "30px" }}
                color="success"
                onClick={() => {
                  handleclick(product);
                }}
              >
                ADD TO CART
              </Button>
            </CardContent>
          </Grid>
        </Grid>
      </Box>
    </React.Fragment>
  );
};
