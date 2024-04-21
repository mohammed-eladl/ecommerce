/* eslint-disable react/prop-types */
import { AddShoppingCartOutlined } from "@mui/icons-material";
import { Box, Button, Stack, ToggleButton, ToggleButtonGroup, Typography } from "@mui/material";
import { useState } from "react";

function ProductDetails({ clickedProdut }) {
const [imgselecd, setImgselecd] = useState(0);
  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2.5,
        flexDirection: { xs: "column", sm: "row" },
      }}
    >
      <Box display={"flex"}>
        <img
          width={300}
          src={clickedProdut.attributes.product_img.data[imgselecd].attributes.url}
          alt=""
        />
      </Box>

      <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
        <Typography variant="h5">
          {clickedProdut.attributes.product_title}
        </Typography>
        <Typography my={0.4} fontSize={"22px"} color={"crimson"} variant="h6">
          ${clickedProdut.attributes.product_price}
        </Typography>
        <Typography variant="body1">
          {clickedProdut.attributes.product_description}
        </Typography>

        <Stack
          sx={{ justifyContent: { xs: "center", sm: "left" } }}
          direction={"row"}
          alignItems={"center"}
          gap={1}
          my={2}
        >
          <ToggleButtonGroup
            value={imgselecd}
            exclusive
            sx={{
              ".Mui-selected": {
                border: "1px solid royalblue !important",
                borderRadius: "5px !important",
                opacity: "1",
                backgroundColor: "initial",
              },
            }}
          >
          {clickedProdut.attributes.product_img.data.map((item,index) => {
            return (
              <ToggleButton
              key={item.id}
              value={index}
              sx={{
                width: "110px",
                height: "110px",
                mx: 1,
                p: "0",
                opacity: "0.5",
              }}
            >
              <img
              onClick={() => {
                setImgselecd(index)
              }}
                key={item.id}
                src={item.attributes.url}
                alt=""
                width={90}
                height={100}
              />
              </ToggleButton>
            );
          })}
          </ToggleButtonGroup>
        </Stack>
        <Button
          sx={{ mb: { xs: "1", sm: "0" }, textTransform: "capitalize" }}
          variant="contained"
        >
          <AddShoppingCartOutlined sx={{ mr: 1 }} fontSize="small" />
          Buy Now
        </Button>
      </Box>
    </Box>
  );
}

export default ProductDetails;
