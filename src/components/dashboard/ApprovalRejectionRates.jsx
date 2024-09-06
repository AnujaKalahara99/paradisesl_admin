import React from "react";
import { Box, Typography, Paper } from "@mui/material";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { name: "Approved", count: 400 },
  { name: "Rejected", count: 300 },
];

const COLORS = ["#004d99", "#ff5722"]; // Refined color palette

const ApprovalRejectionRates = () => (
  <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Typography
        variant="h6"
        align="center"
        sx={{
          fontWeight: "medium",
          color: "text.primary",
          textTransform: "uppercase", // Makes the text uppercase
          letterSpacing: 1, // Adds space between letters
        }}
      >
        Approval Rejection Rates
      </Typography>
    </Box>
    <Box sx={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical" // Switches the chart to horizontal layout
        >
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
          <XAxis type="number" tick={{ fill: "#555555" }} />
          <YAxis dataKey="name" type="category" tick={{ fill: "#555555" }} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill={COLORS[0]} // Color for 'Approved'
            barSize={30}
          />
          <Bar
            dataKey="count"
            fill={COLORS[1]} // Color for 'Rejected'
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  </Paper>
);

export default ApprovalRejectionRates;
