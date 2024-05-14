import { Box, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import React, { useState } from "react";
import { useGetTransactionsQuery } from "state/api";
import DataGridCustomToolbar from "components/DataGridCustomToolbar";

const Transactions = () => {
  const theme = useTheme();
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(20);
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({});

  const [searchInput, setSearchInput] = useState("");

  const { data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    search,
    sort: JSON.stringify(sort),
  });

  // console.log(data);
  console.log(page, pageSize);
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
      headerName: "Created At",
      flex: 1,
    },
    {
      field: "products",
      headerName: "No. of Products",
      flex: 0.5,
      sortable: false,
      renderCell: (params) => {
        return params.value.length;
      },
    },
    {
      field: "cost",
      headerName: "Cost",
      flex: 1,
      renderCell: (params) => {
        return `$${Number(params.value).toFixed(2)}`;
      },
    },
  ];

  return (
    <Box m={"1.5rem 2.5rem"}>
      <Header title="Transactions" subtitle="List of Transactions" />
      <Box
        height={"80vh"}
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
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0}
          pageSizeOptions={[10, 20, 50, 100]}
          pagination={true}
          page={page}
          pageSize={pageSize}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(newSortModel)}
          slots={{ toolbar: DataGridCustomToolbar }}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch },
          }}
        />
      </Box>
    </Box>
  );
};

export default Transactions;
