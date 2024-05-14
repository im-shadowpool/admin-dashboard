import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import Header from "components/Header";
import OverviewChart from "components/OverviewChart";
import React, { useState } from "react";

const Overview = () => {
  const [view, setView] = useState("units");

  return (
    <Box m={"0.5rem 2rem"}>
      <Header
        title={"Overview"}
        subtitle={"Overview of general revenue and profit"}
      />
      <Box height={"72vh"}>
        <FormControl sx={{ mt: "1rem" }}>
          <InputLabel>View</InputLabel>
          <Select
          sx={{"& .MuiSelect-select" : {
            padding: "0.6rem 6rem 0.6rem 1rem"
          }}}
            padding={1}
            height={20}
            value={view}
            onChange={(e) => setView(e.target.value)}
            label="View"
          >
            <MenuItem value={"sales"}>Sales</MenuItem>
            <MenuItem value={"units"}>Units</MenuItem>
          </Select>
        </FormControl>
        <OverviewChart view={view} />
      </Box>
    </Box>
  );
};

export default Overview;
