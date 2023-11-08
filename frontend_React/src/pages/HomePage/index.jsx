import { Box, Card, Chip, Typography, styled } from "@mui/material";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { API_ROUTES } from "constants";
import { useCustomQuery } from "hooks";
import React, { Fragment } from "react";
import { theme } from "utils/theme";
import FullPageLoader from "components/FullPageLoader";

const ProductCard = ({ title, chipLabel, variant = "primary" }) => {
  return (
    <Card
      sx={{
        margin: "8px",
        padding: "9px 18px",
        borderRadius: "12px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          component="p"
          sx={{
            fontWeight: "600",
          }}
          variant="body1"
        >
          {title}
        </Typography>
        <Chip
          label={chipLabel}
          color={variant}
          style={{ borderRadius: "6px" }}
        />
      </Box>
    </Card>
  );
};
const Title = styled(Typography)(({ theme }) => ({
  margin: "10px",
  fontWeight: 600,
  color: theme.palette.primary.main,
}));
const Container = styled(Box)(({ theme }) => {
  return {
    background: "white",
    borderRadius: "5px",
    boxShadow: "0px 0px 3px 0px #868686",
    padding: "2px 0",
    maxHeight: "400px",
    overflow: "scroll",
    overflowX: "hidden",
  };
});
export default function Home() {
  const { isLoading, data } = useCustomQuery({
    url: API_ROUTES.products.popular.endpoint,
    key: API_ROUTES.products.popular.key,
    select: (data) => data.data.products,
  });

  const { isLoading: isLowStockLoading, data: LowStockProducts } =
    useCustomQuery({
      url: API_ROUTES.products.lowStock.endpoint,
      key: API_ROUTES.products.lowStock.key,
      select: (data) => data.data.products,
    });
  if (isLoading || isLowStockLoading) {
    return <FullPageLoader />;
  }
  return (
    <Box sx={{ pb: 7 }}>
      <Title style={{ fontWeight: "bold", marginLeft: "0px" }} variant="h5">
        Popular Products
      </Title>
      <Container>
        {data.map((product) => {
          return (
            <Fragment key={product.id}>
              <ProductCard
                title={product.title}
                chipLabel={`${product.sold} sold`}
              />
            </Fragment>
          );
        })}
      </Container>
      <Title
        style={{
          fontWeight: "bold",
          marginLeft: "0px",
          color: theme.palette.error.main,
        }}
        variant="h5"
      >
        Low Stock!
      </Title>
      {LowStockProducts.length > 0 ? (
        <Container>
          {LowStockProducts.map((product) => {
            return (
              <Fragment key={product.id}>
                <ProductCard
                  title={product.title}
                  chipLabel={`${product.available} in stock`}
                  variant="error"
                />
              </Fragment>
            );
          })}
        </Container>
      ) : (
        <Container
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            padding: "10px 0px",
            overflow: "hidden",
          }}
        >
          <ThumbUpAltIcon color="primary" />
          <Typography>Nothing to see here</Typography>
        </Container>
      )}
    </Box>
  );
}
