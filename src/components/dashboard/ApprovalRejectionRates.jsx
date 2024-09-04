import React from "react";
import { Container, Typography, Box } from "@mui/material";
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
      Approval Rejection Rates
    </Typography>
    <Box sx={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid stroke="#f5f5f5" strokeDasharray="5 5" />
          <XAxis dataKey="name" tick={{ fill: "#555555" }} />
          <YAxis tick={{ fill: "#555555" }} />
          <Tooltip />
          <Legend />
          <Bar
            dataKey="count"
            fill={COLORS[0]} // Color for 'Approved'
            barSize={30}
          />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  </Container>
);

export default ApprovalRejectionRates;
