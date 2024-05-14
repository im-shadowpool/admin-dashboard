import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { CustomColumnMenu } from "components/DataGridCustomColumnMenu";
import Header from "components/Header";
import React from "react";
import { useSelector } from "react-redux";
import { useGetAdminsQuery, useGetAffiliatesQuery } from "state/api";

const Affiliates = () => {
  const userId = useSelector((state) => state.global.userId);
  const theme = useTheme();
  const { data, isLoading } = useGetAffiliatesQuery(userId);
  // console.log(data);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "userId",
      headerName: "User ID",
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: "CreatesAt",
      flex: 1,
    },
    {
      field: "products",
      headerName: "No. of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
  ];

  return (
    <Box m={"1rem 2.5rem"}>
      <Header
        title="Affiliates"
        subtitle="Track your Affiliate Sales Performance Here"
      />
      <Box
        mt={"40px"}
        height={"75vh"}
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "$ .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .MuiDataGrid-columnHeaders .MuiDataGrid-topContainer .css-1essi2g-MuiDataGrid-columnHeaderRow":
            {
              backgroundColor: `${theme.palette.background.alt} !important`,
              color: theme.palette.secondary[100],
              borderBottom: "none",
            },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
            backgroundColor: theme.palette.background.alt,
            color: theme.palette.secondary[100],
            borderTop: "none",
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${theme.palette.secondary[200]} !important`,
          },
          // "& .css-1essi2g-MuiDataGrid-columnHeaderRow":{
          //   backgroundColor: theme.palette.background.alt,
          //   color: theme.palette.secondary[100],
          //   borderBottom: "none",
          // }
          ".MuiDataGrid-container--top [role=row]": {
            backgroundColor: `${theme.palette.background.alt} !important`,
            color: theme.palette.secondary[100],
            borderBottom: "none",
          },
        }}
      >
        <DataGrid
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.sales) || []}
          columns={columns}
          slots={{
            columnMenu: CustomColumnMenu,
          }}
        />
      </Box>
    </Box>
  );
};

export default Affiliates;
