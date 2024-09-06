import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Box, Typography, Paper } from "@mui/material";

// const data = [
//   { date: "2024-09-01", applications: 40 },
//   { date: "2024-09-02", applications: 30 },
//   { date: "2024-09-03", applications: 20 },
//   // More data
// ];

const ApplicationVolumeByTime = (props) => (
  <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Typography
        variant="h6"
        align="center"
        sx={{ fontWeight: "medium", color: "text.primary" }}
      >
        Application Volume By Time
      </Typography>
    </Box>
    <Box sx={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={props.data}>
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
          <XAxis dataKey="date" tick={{ fill: "#555555" }} />
          <YAxis tick={{ fill: "#555555" }} />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="applications"
            stroke="#004d99" // Updated color
            strokeWidth={2} // Slightly thicker line for better visibility
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  </Paper>
);

export default ApplicationVolumeByTime;
