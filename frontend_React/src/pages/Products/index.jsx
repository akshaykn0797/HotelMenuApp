import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import { Loader } from "components/Atoms/Loader";
import ProductCard, { ProductUpsertCard } from "components/ProductCard";
import { NoData } from "components/Molecules/NoData";
import { Fab } from "@mui/material";
import { theme } from "utils/theme";
import { Add } from "@mui/icons-material";
import { FullScreenModal } from "components/Molecules/FullScreenModal";
import { useAllProductsQuery } from "hooks";

const Products = () => {
  const [searchName, setSearchName] = useState("");
  const [searchedProducts, setSearchedProducts] = useState([]);
  const [modalState, setModalState] = useState({ open: false });
  const { data: allProducts, isLoading: productsLoading } =
    useAllProductsQuery();
  useEffect(() => {
    if (!searchName) {
      setSearchedProducts(allProducts);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [allProducts]);

  if (productsLoading) {
    return <Loader />;
  }

  const handleResetSearch = () => {
    setSearchName("");
    setSearchedProducts(allProducts);
  };

  const handleProductSearch = ({ target }) => {
    const newSearch = target.value;
    setSearchName(newSearch);
    const tempProducts = (allProducts || []).filter((product) =>
      product.title.toLowerCase().includes(newSearch.toLowerCase())
    );
    setSearchedProducts(tempProducts);
  };
  const handleCreate = () => {
    // console.log("Handle cfreate")
    setModalState((state) => ({ open: true }));
  }
  const handleClose = () => {
    // console.log("Check this clickded");
    setModalState((state) => ({ open: false }));
  };

  return (
    <Box>
      <Fab
        style={{
          position: "fixed",
          bottom: "70px",
          right: "30px",
          backgroundColor: theme.palette.primary.light,
          color: "white",
        }}
        aria-label="add"
        onClick={handleCreate}
      >
        <Add />
      </Fab>

      <FullScreenModal
        hideConfirmation
        {...modalState}
        handleClose={() => handleClose()}
      >
        <ProductUpsertCard
          onComplete={() => setModalState({ open: false })}
        />
      </FullScreenModal>

      <FormControl sx={{ mb: 3 }} fullWidth variant="outlined">
        <InputLabel htmlFor="search-food-bar">
          Search by Product Name
        </InputLabel>
        <OutlinedInput
          id="search-food-bar"
          fullWidth
          value={searchName}
          onChange={handleProductSearch}
          inputProps={{
            autoComplete: "off",
          }}
          endAdornment={
            searchName && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="cancel search"
                  onClick={handleResetSearch}
                  edge="end"
                >
                  <HighlightOffIcon />
                </IconButton>
              </InputAdornment>
            )
          }
          label="Search by Product Name"
        />
      </FormControl>

      {(searchedProducts || []).map((product) => {
        product.image = product.imageUrl;
        return (
          <ProductCard
            product={product}
            key={product.id}
          />
        );
      })}
      {searchName && !(searchedProducts || []).length && (
        <NoData text="There is no matching product." />
      )}
      {allProducts && !allProducts.length && (
        <NoData text="There is no product." />
      )}
    </Box>
  );
};

export default Products;
