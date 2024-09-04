import React from "react";
import { Container, Typography, Box } from "@mui/material";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { date: "2024-09-01", applications: 40 },
  { date: "2024-09-02", applications: 30 },
  { date: "2024-09-03", applications: 20 },
  // More data
];

const ApplicationVolumeByTime = () => (
  <Container
    sx={{
      bgcolor: "white",
      padding: 2,
      borderRadius: 2,
      boxShadow: 3,
      height: 400,
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}
  >
    <Typography
      variant="h5"
      align="center"
      sx={{
        fontWeight: "bold",
        color: "#004d99", // Primary color for the title
        marginBottom: 2, // Adds spacing below the title
        textTransform: "uppercase", // Makes the text uppercase
        letterSpacing: 1, // Adds space between letters
      }}
    >
      Application Volume By Time
    </Typography>
    <Box sx={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
          <XAxis dataKey="date" tick={{ fill: "#555555" }} />
          <YAxis tick={{ fill: "#555555" }} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            dataKey="applications"
            stroke="#004d99" // Updated color
            strokeWidth={2} // Slightly thicker line for better visibility
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  </Container>
);

export default ApplicationVolumeByTime;
