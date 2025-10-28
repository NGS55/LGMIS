"use client";

import {
  Box,
  Typography,
  Paper,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  IconButton,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Payment as PaymentIcon,
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { format } from 'date-fns';
import { PropertyRate } from '@/types/valuation';

// Mock data - replace with actual API calls
const mockRates: PropertyRate[] = [
  {
    id: '1',
    propertyId: 'PROP-001',
    valuationId: 'VAL-001',
    ratePercentage: 2.5,
    annualAmount: 12500,
    billingCycle: 'quarterly',
    dueDate: new Date('2025-12-31'),
    status: 'current',
    balance: 12500,
    payments: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function PropertyRatesDashboard() {
  const [rates] = useState<PropertyRate[]>(mockRates);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW'
    }).format(amount);
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Property Rates
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* Handle new rate assessment */}}
        >
          New Assessment
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AssessmentIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Collection Statistics</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Total Billed
                </Typography>
                <Typography variant="h4">
                  {formatCurrency(
                    rates.reduce((sum, rate) => sum + rate.annualAmount, 0)
                  )}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Outstanding
                </Typography>
                <Typography variant="h4">
                  {formatCurrency(
                    rates.reduce((sum, rate) => sum + rate.balance, 0)
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Rate Register
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Property ID</TableCell>
                    <TableCell>Rate (%)</TableCell>
                    <TableCell>Annual Amount</TableCell>
                    <TableCell>Billing Cycle</TableCell>
                    <TableCell>Due Date</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rates.map((rate) => (
                    <TableRow key={rate.id}>
                      <TableCell>{rate.propertyId}</TableCell>
                      <TableCell>{rate.ratePercentage}%</TableCell>
                      <TableCell>{formatCurrency(rate.annualAmount)}</TableCell>
                      <TableCell style={{ textTransform: 'capitalize' }}>
                        {rate.billingCycle}
                      </TableCell>
                      <TableCell>{format(rate.dueDate, 'MMM d, yyyy')}</TableCell>
                      <TableCell>{formatCurrency(rate.balance)}</TableCell>
                      <TableCell>
                        <Chip
                          label={rate.status}
                          color={
                            rate.status === 'paid'
                              ? 'success'
                              : rate.status === 'overdue'
                              ? 'error'
                              : 'warning'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => {/* Handle view */}}
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {/* Handle payment */}}
                        >
                          <PaymentIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {/* Handle edit */}}
                        >
                          <EditIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}