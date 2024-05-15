import { Person, ShoppingCart } from "@mui/icons-material";
import { Box, Divider, Typography, useTheme } from "@mui/material";
import Header from "components/Header";
import ErrorPage from "pages/errorpage";
import React from "react";
import { useGetSearchResultsQuery } from "state/api";

const Search = () => {
  const theme = useTheme();
  const search = window.location.search;
  const query = new URLSearchParams(search).get("q");
  //   console.log(search, query);
  const { data, isLoading } = useGetSearchResultsQuery(query);
  //   console.log(data, isLoading);

  return (
    <Box m={"0.5rem 2rem"}>
      <Header
        title={"Search"}
        subtitle={`Your Search Resuls are here: ${query}`}
      />
      <Box
        mt={"20px"}
        display={"grid"}
        gridTemplateColumns={"repeat(2, 1fr)"}
        gap={"20px"}
        gridAutoRows={"minmax(160px, auto)"}
        sx={{
          "@media (max-width: 1200px)": {
            gridTemplateColumns: "repeat(2, 1fr)",
          },
          "@media (max-width: 800px)": {
            gridTemplateColumns: "repeat(1, 1fr)",
          },
        }}
      >
        {console.log(data?.searchResultsUser.length)}
        {data?.searchResultsUser.length > 0 && (
          <Box
            backgroundColor={theme.palette.background.alt}
            p={"2rem"}
            borderRadius={"0.55rem"}
            gridColumn={"span 1"}
            gridRow={"span 1"}
            display={"flex"}
            flexDirection={"column"}
            flex={"1 1 100%"}
            justifyContent={"space-between"}
            height={"70vh"}
            overflow={"auto"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <Person
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
              <Typography
                m={"0 1rem"}
                color={theme.palette.secondary[300]}
                fontSize={"20px"}
                variant="h4"
                fontWeight={600}
              >
                User Search Results
              </Typography>
            </Box>
            <Box mt={"15px"} ml={"8px"}>
              {data.searchResultsUser.map((user, i) => (
                <Box key={i}>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>UserID:</b> {user._id}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Name:</b> {user.name}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Phone:</b> {user.phoneNumber}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Email:</b> {user.email}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Address:</b> {user.city}, {user.country}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"} key={user.role}>
                    <b>Role:</b> {user.role}
                  </Typography>

                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Transactions: </b>
                    {user.transactions.map((transaction) => (
                      <Typography fontStyle={"italic"} ml={"10px"}>
                        {transaction}
                      </Typography>
                    ))}
                  </Typography>
                  <Divider
                    sx={{
                      margin: "1.3rem 0",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}

        {data?.searchResultsProducts.length > 0 && (
          <Box
            backgroundColor={theme.palette.background.alt}
            p={"2rem"}
            borderRadius={"0.55rem"}
            gridColumn={"span 1"}
            gridRow={"span 1"}
            display={"flex"}
            flexDirection={"column"}
            flex={"1 1 100%"}
            height={"70vh"}
            overflow={"auto"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <ShoppingCart
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
              <Typography
                m={"0 1rem"}
                color={theme.palette.secondary[300]}
                fontSize={"20px"}
                variant="h4"
                fontWeight={600}
              >
                Product Search Results
              </Typography>
            </Box>
            <Box mt={"15px"} ml={"8px"}>
              {data.searchResultsProducts.map((user, i) => (
                <Box key={i}>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Product ID:</b> {user._id}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Product Name:</b> {user.name}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Price:</b> ${user.price}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Category:</b> {user.category}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Desciption:</b> {user.description}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Rating:</b> {user.rating}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Supply:</b> {user.supply}
                  </Typography>
                  <Divider
                    sx={{
                      margin: "1.3rem 0",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
        {data?.searchResultsTransactions.length > 0 && (
          <Box
            backgroundColor={theme.palette.background.alt}
            p={"2rem"}
            borderRadius={"0.55rem"}
            gridColumn={"span 1"}
            gridRow={"span 1"}
            display={"flex"}
            flexDirection={"column"}
            flex={"1 1 100%"}
            height={"70vh"}
            overflow={"auto"}
          >
            <Box display={"flex"} alignItems={"center"}>
              <ShoppingCart
                sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
              />
              <Typography
                m={"0 1rem"}
                color={theme.palette.secondary[300]}
                fontSize={"20px"}
                variant="h4"
                fontWeight={600}
              >
                Product Search Results
              </Typography>
            </Box>
            <Box mt={"15px"} ml={"8px"}>
              {data.searchResultsTransactions.map((user) => (
                <Box>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Transaction ID</b> {user._id}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Cost:</b> ${user.cost}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>User ID:</b> {user.userId}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Purchased Items: </b>
                    {user.products.map((productId) => (
                      <Typography fontStyle={"italic"} ml={"10px"}>
                        {productId}
                      </Typography>
                    ))}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Transaction Time:</b>{" "}
                    {new Date(user.createdAt).toLocaleTimeString()}
                  </Typography>
                  <Typography mb={"3px"} fontSize={"15px"}>
                    <b>Transaction Date:</b>{" "}
                    {new Date(user.createdAt).toDateString()}
                  </Typography>
                  <Divider
                    sx={{
                      margin: "1.3rem 0",
                    }}
                  />
                </Box>
              ))}
            </Box>
          </Box>
        )}
        
      </Box>
      {data?.searchResultsUser.length === 0 &&
          data?.searchResultsProducts.length === 0 &&
          data?.searchResultsTransactions.length === 0 && <ErrorPage />}
    </Box>
  );
};

export default Search;
