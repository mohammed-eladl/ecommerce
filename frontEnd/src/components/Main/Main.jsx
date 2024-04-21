import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Dialog,
  IconButton,
  Rating,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
  useTheme,
} from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import AddShoppingCartOutlinedIcon from "@mui/icons-material/AddShoppingCartOutlined";
import { useState } from "react";
import { Close } from "@mui/icons-material";
import ProductDetails from "./ProductDetails";
import { useGetproductByNameQuery } from "../../redux/Product";
function Main() {
  const handleAlignment = (event, newAlignment) => {
    if (newAlignment !== null) {
      setDataAPI(newAlignment);
    }

  };

  const theme = useTheme();

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const all_Category = "products?populate=*";
  const men_Category = "products?populate=*&filters[porduct_category][$eq]=men";
  const women_Category =
    "products?populate=*&filters[porduct_category][$eq]=women";

  const [dataAPI, setDataAPI] = useState(all_Category);
  const { data, error, isLoading } = useGetproductByNameQuery(dataAPI);
  const [clickedProdut, setClickedProdut] = useState({});

  if (isLoading) {
    return (
      <Box sx={{ py: 11, textAlign: "center" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container
        sx={{
          py: 11,
          textAlign: "center",
        }}
      >
        <Typography variant="h6">
          {
            // @ts-ignore
            error.error
          }
        </Typography>

        <Typography variant="h6">Please try again later</Typography>
      </Container>
    );
  }

  if (data) {
    return (
      <Container sx={{ py: 9 }}>
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          gap={3}
        >
          <Box>
            <Typography variant="h6">Selected Products</Typography>
            <Typography variant="body1" fontWeight={300}>
              All our New Arrivals in a Exclusive Brand Se;ection
            </Typography>
          </Box>
          <ToggleButtonGroup
            color="error"
            value={dataAPI}
            exclusive
            onChange={handleAlignment}
            aria-label="text alignment"
            sx={{
              ".Mui-selected": {
                border: "1px solid rgba(233,69,96,0.5)!important",
                color: "#e94560",
                backgroundColor: "initial",
              },
            }}
          >
            <ToggleButton
              sx={{ color: theme.palette.text.primary }}
              className="myButton"
              value={all_Category}
              aria-label="left aligned"
            >
              All Products
            </ToggleButton>
            <ToggleButton
              sx={{ mx: "16px !important", color: theme.palette.text.primary }}
              className="myButton"
              value={men_Category}
              aria-label="centered"
            >
              Men Category
            </ToggleButton>
            <ToggleButton
              sx={{ color: theme.palette.text.primary }}
              className="myButton"
              value={women_Category}
              aria-label="right aligned"
            >
              Women Category
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack
          direction={"row"}
          justifyContent={"space-between"}
          flexWrap={"wrap"}
          alignItems={"center"}
        >
             <AnimatePresence>
          {data.data.map((item) => {
            return (
              <Card

                  component={motion.section}
                  layout
                  initial={{ transform: "scale(0)" }}
                  animate={{ transform: "scale(1)" }}
                  transition={{ duration: 1.6, type: "spring", stiffness: 50 }}
                  key={item.id}
                  sx={{
                    maxWidth: 333,
                    mt: 6,
                    ":hover .MuiCardMedia-root ": {
                      rotate: "1deg",
                      scale: "1.1",
                      transition: "0.35s",
                    },
                  }}
              >
                {/* ${import.meta.env.VITE_BASE_URL} */}
                <CardMedia
                  sx={{ height: 277 }}
                  // @ts-ignore
                  image={`${item.attributes.product_img.data[0].attributes.url}`}
                  title="green iguana"
                />

                <CardContent>
                  <Stack
                    direction={"row"}
                    justifyContent={"space-between"}
                    alignItems={"center"}
                  >
                    <Typography gutterBottom variant="h6" component={"div"}>
                      {item.attributes.product_title}
                    </Typography>
                    <Typography variant="subtitle1" component={"p"}>
                      ${item.attributes.product_price}
                    </Typography>
                  </Stack>

                  <Typography variant="body2" color="text.secondary">
                    {item.attributes.product_description}
                  </Typography>
                </CardContent>

                <CardActions sx={{ justifyContent: "space-between" }}>
                  <Button
                    sx={{ textTransform: "capitalize" }}
                    onClick={() => {
                      handleClickOpen()
                      setClickedProdut(item)
                    }}
                  >
                    <AddShoppingCartOutlinedIcon sx={{ mr: 1 }} /> Add To Cart
                  </Button>

                  <Rating
                    name="read-only"
                    value={item.attributes.product_rating}
                    precision={0.5}
                    readOnly
                  />
                </CardActions>
              </Card>
            );
          })}
          </AnimatePresence>
        </Stack>

        <Dialog
          sx={{ ".MuiPaper-root": { minWidth: { xs: "100%", md: 800 } } }}
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <IconButton
            onClick={handleClose}
            sx={{
              ":hover": { color: "red", rotate: "180deg", transition: "0.5s" },
              position: "absolute",
              top: 0,
              right: 10,
            }}
          >
            <Close />
          </IconButton>
          <ProductDetails clickedProdut={clickedProdut} />
        </Dialog>
      </Container>
    );
  }
}

export default Main;
