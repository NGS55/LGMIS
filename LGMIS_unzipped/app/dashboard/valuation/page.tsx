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
  Assessment as AssessmentIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { format } from 'date-fns';
import { Property } from '@/types/shared';
import { PropertyValuation } from '@/types/valuation';

// Mock data - replace with actual API calls
const mockValuations: PropertyValuation[] = [
  {
    id: '1',
    propertyId: 'PROP-001',
    property: {
      id: 'PROP-001',
      title: 'Commercial Building A',
      plotNumber: 'PLT-2025-001',
      size: 1000,
      location: {
        latitude: -15.3875,
        longitude: 28.3228,
        address: '123 Independence Ave'
      },
      owner: 'John Doe',
      propertyType: 'commercial',
      status: 'active',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    assessedValue: 500000,
    valuationDate: new Date('2025-10-01'),
    nextReviewDate: new Date('2026-10-01'),
    assessor: 'Jane Smith',
    status: 'approved',
    documents: [],
    formulaFactors: {
      landUseMultiplier: 1.5,
      zoneFactor: 1.2,
      sizeFactor: 1.1,
      baseRate: 100,
      adjustments: []
    },
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function ValuationDashboard() {
  const [valuations] = useState<PropertyValuation[]>(mockValuations);

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
          Valuation Role
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* Handle new valuation */}}
        >
          New Valuation
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AssessmentIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Valuation Statistics</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Total Properties
                </Typography>
                <Typography variant="h4">
                  {valuations.length}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Total Value
                </Typography>
                <Typography variant="h4">
                  {formatCurrency(
                    valuations.reduce((sum, val) => sum + val.assessedValue, 0)
                  )}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Valuation Register
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Plot Number</TableCell>
                    <TableCell>Property Type</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Assessed Value</TableCell>
                    <TableCell>Valuation Date</TableCell>
                    <TableCell>Next Review</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {valuations.map((valuation) => (
                    <TableRow key={valuation.id}>
                      <TableCell>{valuation.property.plotNumber}</TableCell>
                      <TableCell style={{ textTransform: 'capitalize' }}>
                        {valuation.property.propertyType}
                      </TableCell>
                      <TableCell>{valuation.property.location.address}</TableCell>
                      <TableCell>{formatCurrency(valuation.assessedValue)}</TableCell>
                      <TableCell>{format(valuation.valuationDate, 'MMM d, yyyy')}</TableCell>
                      <TableCell>{format(valuation.nextReviewDate, 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <Chip
                          label={valuation.status}
                          color={valuation.status === 'approved' ? 'success' : 'warning'}
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