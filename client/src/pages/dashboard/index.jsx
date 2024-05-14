import {
  DownloadOutlined,
  Email,
  EmailOutlined,
  PersonAdd,
  PointOfSale,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Header from "components/Header";
import FlexBetween from "components/flexBetween";
import React from "react";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox.jsx";
import OverviewChart from "components/OverviewChart";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";

const Dashboard = () => {
  const theme = useTheme();
  const isNonMobileScreens = useMediaQuery("(min-width:1200px)");
  const { data, isLoading } = useGetDashboardQuery();
  // console.log(data)
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
      <FlexBetween>
        <Header title="Dashboard" subtitle={"Welcome to your Dashboard"} />
        <Box>
          <Button
            sx={{
              backgroundColor: theme.palette.secondary.light,
              color: theme.palette.background.alt,
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
            }}
          >
            <DownloadOutlined sx={{ mr: "10px" }} />
            Download Reports
          </Button>
        </Box>
      </FlexBetween>
      <Box
        mt={"20px"}
        display={"grid"}
        gridTemplateColumns={"repeat(12, 1fr)"}
        gridAutoRows={"160px"}
        gap={"20px"}
        sx={{
          "& > div": { gridColumn: isNonMobileScreens ? undefined : "span 12" },
        }}
      >
        <StatBox
          title={"Total Customers"}
          value={data && data?.totalCustomers}
          increase={"+14%"}
          description={"Since last month"}
          icon={
            <Email
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title={"Sales Today"}
          value={data && data?.todayStats.totalSales}
          increase={"+23%"}
          description={"Since yesterday"}
          icon={
            <PointOfSale
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn={"span 8"}
          gridRow={"span 2"}
          backgroundColor={theme.palette.background.alt}
          p={"1rem"}
          borderRadius={"0.55rem"}
        >
          <OverviewChart view={"sales"} isDashboard={true} />
        </Box>
        <StatBox
          title={"Monthly Sales"}
          value={data && data?.thisMonthStats.totalSales}
          increase={"+17%"}
          description={"Since last month"}
          icon={
            <PersonAdd
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title={"Yearly Sales"}
          value={data && data?.yearlySalesTotal}
          increase={"+38%"}
          description={"Since last year"}
          icon={
            <Traffic
              sx={{ color: theme.palette.secondary[300], fontSize: "26px" }}
            />
          }
        />
        <Box
          gridColumn={"span 8"}
          gridRow={"span 3"}
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
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
              backgroundColor: theme.palette.background.alt,
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
          />
        </Box>
        <Box
          gridColumn={"span 4"}
          gridRow={"span 3"}
          backgroundColor={theme.palette.background.alt}
          p={"1.5rem"}
          borderRadius={"0.55rem"}
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[100] }}>
            Sales by Category
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            fontSize={"0.8rem"}
            p={"0 0.6rem"}
            sx={{ color: theme.palette.secondary[200] }}
          >
            Breakdown of sales by category and items sold in each category for
            this year
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
