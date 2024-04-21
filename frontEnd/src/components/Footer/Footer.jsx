import { Box, Button, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        bgcolor: "#2B3445",
        py: 1.3,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
      }}
    >
      <Typography
        justifyContent={"center"}
        display={"flex"}
        alignItems={"center"}
        color={"HighlightText"}
        variant="h6"
        sx={{ fontSize: 18 }}
      >
        Designed and developed by
        <Button
          sx={{
            mx: 0.5,
            fontSize: "18px",
            textTransform: "capitalize",
            color: "#ff7790",
          }}
          href="https://www.linkedin.com/in/mohamed-al-adl-041650233/"
          target="_blank"
          variant="text"
          color="primary"
        >
          Mohamed Al-Adl
        </Button>
        ©2023
      </Typography>
    </Box>
  );
}

export default Footer;
