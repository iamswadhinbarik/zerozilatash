import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import Typography from "@mui/material/Typography";

import Header from "./common/header";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
}));

export const Home = () => {
  const navigate = useNavigate();
  let [allCategories, setAllCategories] = useState([]);

  const getALLcategories = () => {
    axios
      .get("https://fakestoreapi.com/products/categories")
      .then((response) => {
        console.log(response.data);
        allCategories = response.data;
        setAllCategories([...allCategories]);
        console.log("allCategories", allCategories);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    if (allCategories.length === 0) {
      getALLcategories();
    }
  }, []);

  const handleclick = (Category) => {
    navigate(`/products/${Category}`);
  };
  return (
    <React.Fragment>
      <Header />
      <Box>
        <img src="/images/banner.jpg" width="100%" height="300px" />
        <Box style={{ margin: "20px" }}>
          <Card style={{ textAlign: "center" }}>
            <Typography gutterBottom variant="h5" component="div">
              Top Categorys
            </Typography>
          </Card>
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            {allCategories.map((Category) => {
              return (
                <Grid
                  item
                  xs={6}
                  sm={6}
                  md={4}
                  lg={3}
                  onClick={() => {
                    handleclick(Category);
                  }}
                  style={{ cursor: "pointer" }}
                >
                  <img src="/images/catimg.png" width="100%" />
                  <Item elevation={"10"} style={{ fontFamily: "fantasy" }}>
                    {Category}
                  </Item>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Box>
    </React.Fragment>
  );
};
