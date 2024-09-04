import React from "react";
import { Container, Typography, Box } from "@mui/material";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  { name: "USA", value: 200 },
  { name: "India", value: 150 },
  { name: "China", value: 100 },
  // More data
];

const COLORS = ["#004d99", "#009688", "#ff9800", "#ff5722", "#c62828"];

const CountryOfOriginAnalysis = () => (
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
      Country Of Origin Analysis
    </Typography>
    <Box sx={{ width: "100%", height: "100%" }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" outerRadius="80%" dataKey="value">
            {data.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  </Container>
);

export default CountryOfOriginAnalysis;
