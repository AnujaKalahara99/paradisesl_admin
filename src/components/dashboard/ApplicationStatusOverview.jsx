import React from "react";
// import { Box } from "@adminjs/design-system";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Container, Typography } from "@mui/material";

const data = [
  { name: "Pending", value: 400 },
  { name: "Approved", value: 300 },
  { name: "Rejected", value: 300 },
  { name: "Under Review", value: 200 },
  { name: "Flagged by Interpol", value: 100 },
];

const COLORS = ["#004d99", "#009688", "#ff9800", "#ff5722", "#c62828"];

const ApplicationStatusOverview = () => (
  <Container
    sx={{
      bgcolor: "white",
      height: 400,
      padding: 2,
      borderRadius: 2,
      boxShadow: 3,
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignItems: "center",
    }}
  >
    <Typography
      variant="h5"
      align="center"
      sx={{
        fontWeight: "bold",
        color: "#1976d2",
        textTransform: "uppercase",
        letterSpacing: 1,
      }}
    >
      Application Status Overview
    </Typography>
    <Box
      sx={{
        width: "100%",
        height: "80%",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
          >
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

export default ApplicationStatusOverview;
