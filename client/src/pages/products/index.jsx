import React, { useState } from "react";
import { useGetProductsQuery } from "state/api";
import Header from "components/Header";
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Rating,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@emotion/react";

const Product = ({
  _id,
  name,
  price,
  description,
  rating,
  category,
  supply,
  productStat,
}) => {
  const theme = useTheme();
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component={"div"}>
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />
        <Typography variant="body2"> {description} </Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="primary"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout={"auto"}
        unmountOnExit
        sx={{
          color: theme.palette.secondary[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {productStat[0].yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {productStat[0].yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  );
};

const Products = () => {
  const { data, isLoading } = useGetProductsQuery();
  const isNotMobile = useMediaQuery("(min-width: 1000px)");
  console.log(data);

  return (
    <Box m={"1rem 2.5rem"}>
      <Header title={"Products"} subtitle={"See your list of products."} />
      {data || !isLoading ? (
        <Box
          mt={"20px"}
          display={"grid"}
          gridTemplateColumns={"repeat(4, minmax(0, 1fr))"}
          justifyContent={"space-between"}
          rowGap={"20px"}
          columnGap={"1.33%"}
          sx={{
            "& > div": { gridColumn: isNotMobile ? undefined : "span 4" },
          }}
        >
          {data?.map(
            ({
              _id,
              name,
              price,
              description,
              rating,
              category,
              supply,
              productStat,
            }) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                price={price}
                description={description}
                rating={rating}
                category={category}
                supply={supply}
                productStat={productStat}
              />
            )
          )}
        </Box>
      ) : (
        <>Loading...</>
      )}
    </Box>
  );
};

export default Products;
