import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Typography, Paper } from "@mui/material";

const data = [
  { name: "Approved", value: 4 },
  { name: "Pending", value: 10 },
  { name: "Flagged", value: 3 },
  { name: "Rejected", value: 1 },
];

const COLORS = [
  "#8bc68a", // Muted Green
  "#6ea8db", // Muted Blue
  "#e5b676", // Muted Orange
  "#e08b84", // Muted Red
];

const ApplicationStatusOverview = (props) => (
  <Paper elevation={1} sx={{ p: 3, borderRadius: 2 }}>
    {console.log(`props ${props.data}`)}
    <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
      <Typography
        variant="h6"
        align="center"
        sx={{ fontWeight: "medium", color: "text.primary" }}
      >
        Application Status Overview
      </Typography>
    </Box>
    <Box sx={{ width: "100%", height: 300 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            // data={props.data}
            cx="50%"
            cy="50%"
            outerRadius="80%"
            fill="#8884d8"
            dataKey="value"
          >
            {props.data.map((entry, index) => (
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
  </Paper>
);

export default ApplicationStatusOverview;
