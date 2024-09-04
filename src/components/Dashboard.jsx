import React from "react";
// import { Box } from "@adminjs/design-system";
import ApplicationStatusOverview from "./dashboard/ApplicationStatusOverview";
import { Grid2 as Grid, Paper, Box, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import ApplicationVolumeByTime from "./dashboard/ApplicationVolumeByTime";
import ApprovalRejectionRates from "./dashboard/ApprovalRejectionRates";
import CountryOfOriginAnalysis from "./dashboard/CountryOfOriginAnalysis";

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: "#fff",
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: "center",
  color: theme.palette.text.secondary,
  ...theme.applyStyles("dark", {
    backgroundColor: "#1A2027",
  }),
}));

const Dashboard = (props) => {
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
          <ApplicationStatusOverview />
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
