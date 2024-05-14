import { Box, useTheme } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import Header from "components/Header";
import React from "react";
import { useGetGeographyQuery } from "state/api";
import { geoData } from "state/geoData";

const Geography = () => {
  const theme = useTheme();
  const { data } = useGetGeographyQuery();

  console.log(data);

  return (
    <Box m={"0.5rem 2rem"}>
      <Header title={"Geography"} subtitle={"Find where your users located"} />
      <Box
        mt={"20px"}
        height={"75vh"}
        border={`1px solid ${theme.palette.secondary.main}`}
        borderRadius={"4px"}
      >
        {data ? (
          <>
            <ResponsiveChoropleth
              data={data}
              theme={{
                axis: {
                  domain: {
                    line: {
                      stroke: theme.palette.secondary[200],
                    },
                  },
                  legend: {
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                  grid: {
                    line: {
                      stroke: theme.palette.background.alt,
                    },
                  },
                  ticks: {
                    line: {
                      stroke: theme.palette.secondary[200],
                      strokeWidth: 1,
                    },
                    text: {
                      fill: theme.palette.secondary[200],
                    },
                  },
                },
                legends: {
                  text: {
                    fill: theme.palette.secondary[200],
                  },
                },
                tooltip: {
                  container: {
                    color: theme.palette.grey[800],
                  },
                },
              }}
              features={geoData.features}
              colors="PuBu"
              margin={{ top: 0, right: 0, bottom: 0, left: -50 }}
              domain={[0, 60]}
              unknownColor="#8c91a1"
              label="properties.name"
              valueFormat=".2s"
              projectionScale={130}
              projectionTranslation={[0.50, 0.5]}
              projectionRotation={[0, 0, 0]}
              // enableGraticule={true}
              // graticuleLineColor={theme.palette.primary.main}
              borderWidth={1}
              // borderColor="#ffffff"
              borderColor={{ theme: "grid.line.stroke" }}
              // borderColor={{ theme: 'labels.text.fill'}}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: true,
                  translateX: 0,
                  translateY: -125,
                  itemsSpacing: 0,
                  itemWidth: 94,
                  itemHeight: 18,
                  itemDirection: "left-to-right",
                  itemTextColor: theme.palette.secondary[200],
                  itemOpacity: 0.85,
                  symbolSize: 18,
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemTextColor: theme.palette.grey[800],
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          </>
        ) : (
          <>Loading</>
        )}
      </Box>
    </Box>
  );
};

export default Geography;
