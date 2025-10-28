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
  RequestQuote as InvoiceIcon,
} from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { format } from 'date-fns';

interface RevenueRecord {
  id: string;
  reference: string;
  source: string;
  amount: number;
  status: 'pending' | 'confirmed' | 'refunded';
  receivedAt: Date;
  updatedAt: Date;
}

const mockRevenues: RevenueRecord[] = [
  {
    id: '1',
    reference: 'REV-2025-001',
    source: 'Property Rates',
    amount: 125000,
    status: 'confirmed',
    receivedAt: new Date('2025-04-15'),
    updatedAt: new Date('2025-04-16'),
  },
  {
    id: '2',
    reference: 'REV-2025-002',
    source: 'Licensing Fees',
    amount: 48000,
    status: 'pending',
    receivedAt: new Date('2025-04-18'),
    updatedAt: new Date('2025-04-18'),
  },
  {
    id: '3',
    reference: 'REV-2025-003',
    source: 'Lease Revenue',
    amount: 32000,
    status: 'refunded',
    receivedAt: new Date('2025-04-10'),
    updatedAt: new Date('2025-04-19'),
  },
];

export default function FinanceDashboard() {
  const [revenues] = useState<RevenueRecord[]>(mockRevenues);

  const totals = useMemo(() => {
    return revenues.reduce(
      (acc, revenue) => {
        acc.all += revenue.amount;
        if (revenue.status === 'confirmed') acc.confirmed += revenue.amount;
        if (revenue.status === 'pending') acc.pending += revenue.amount;
        return acc;
      },
      { all: 0, confirmed: 0, pending: 0 }
    );
  }, [revenues]);

  const formatCurrency = (amount: number) =>
    new Intl.NumberFormat('en-ZM', { style: 'currency', currency: 'ZMW' }).format(amount);

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Finance Dashboard
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              /* handle new receipt */
            }}
            sx={{ mr: 2 }}
          >
            Record Revenue
          </Button>
          <Button
            variant="outlined"
            startIcon={<InvoiceIcon />}
            onClick={() => {
              /* handle invoice */
            }}
          >
            Generate Invoice
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <PaymentIcon color="primary" />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Confirmed Revenue
              </Typography>
              <Typography variant="h5">{formatCurrency(totals.confirmed)}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <PaymentIcon color="action" />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Pending Revenue
              </Typography>
              <Typography variant="h5">{formatCurrency(totals.pending)}</Typography>
            </Box>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, display: 'flex', alignItems: 'center', gap: 2 }}>
            <PaymentIcon color="success" />
            <Box>
              <Typography variant="subtitle2" color="text.secondary">
                Total Recorded
              </Typography>
              <Typography variant="h5">{formatCurrency(totals.all)}</Typography>
            </Box>
          </Paper>
        </Grid>
      </Grid>

      <Paper sx={{ p: 3 }}>
        <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
          Revenue Register
        </Typography>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Reference</TableCell>
                <TableCell>Source</TableCell>
                <TableCell>Amount</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Received</TableCell>
                <TableCell>Updated</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {revenues.map((revenue) => (
                <TableRow key={revenue.id}>
                  <TableCell>{revenue.reference}</TableCell>
                  <TableCell>{revenue.source}</TableCell>
                  <TableCell>{formatCurrency(revenue.amount)}</TableCell>
                  <TableCell>
                    <Chip
                      label={revenue.status}
                      color={
                        revenue.status === 'confirmed'
                          ? 'success'
                          : revenue.status === 'pending'
                          ? 'warning'
                          : 'default'
                      }
                      size="small"
                      sx={{ textTransform: 'capitalize' }}
                    />
                  </TableCell>
                  <TableCell>{format(revenue.receivedAt, 'MMM d, yyyy')}</TableCell>
                  <TableCell>{format(revenue.updatedAt, 'MMM d, yyyy')}</TableCell>
                  <TableCell>
                    <IconButton
                      size="small"
                      onClick={() => {
                        /* handle view */
                      }}
                    >
                      <ViewIcon />
                    </IconButton>
                    <IconButton
                      size="small"
                      onClick={() => {
                        /* handle edit */
                      }}
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
    </Box>
  );
}
