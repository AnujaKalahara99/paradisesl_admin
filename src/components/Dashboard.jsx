import React, { useEffect, useState } from "react";
import { ApiClient } from "adminjs";
import ApplicationStatusOverview from "./dashboard/ApplicationStatusOverview";
import { Grid2 as Grid, Box, Typography } from "@mui/material";
import ApplicationVolumeByTime from "./dashboard/ApplicationVolumeByTime";
import ApprovalRejectionRates from "./dashboard/ApprovalRejectionRates";
import CountryOfOriginAnalysis from "./dashboard/CountryOfOriginAnalysis";

const Dashboard = (props) => {
  const api = new ApiClient();

  const [statusCounts, setStatusCounts] = useState([]);

  useEffect(() => {
    api
      .getDashboard()
      .then((response) => {
        console.log(response.data.statusCounts);
        setStatusCounts(response.data.statusCounts);
      })
      .catch((error) => {
        // handle any errors
      });
  }, []);
  return (
    <Box>
      <Typography
        variant="h4"
        align="center"
        sx={{
          fontWeight: "bold",
          color: "#004d99",
          marginBottom: 4,
          marginTop: 2,
          textTransform: "uppercase",
          letterSpacing: 1,
        }}
      >
        Online Sri Lanka Visa Portal
      </Typography>
      <Grid container spacing={4} padding={2}>
        <Grid size={4}>
          <ApplicationStatusOverview data={statusCounts} />
        </Grid>
        <Grid size={8}>
          <ApplicationVolumeByTime />
        </Grid>
        <Grid size={8}>
          <ApprovalRejectionRates />
        </Grid>
        <Grid size={4}>
          <CountryOfOriginAnalysis />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
