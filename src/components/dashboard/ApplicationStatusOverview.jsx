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
            data={props.data}
            cx="50%"
            cy="50%"
            // label={renderCustomizedLabel}
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
  </Paper>
);

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
}) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {data[index].name}
    </text>
  );
};

export default ApplicationStatusOverview;
