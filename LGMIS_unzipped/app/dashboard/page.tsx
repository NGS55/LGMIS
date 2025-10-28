"use client";

import { Container, Grid, Paper, Typography } from "@mui/material";
import ChartCard from "./charts/ChartCard";
import UserForm from "./forms/UserForm";

export default function DashboardPage() {
  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h5" gutterBottom>Dashboard</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Line Chart</Typography>
            <ChartCard />
          </Paper>
        </Grid>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>Sample Form</Typography>
            <UserForm />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}
