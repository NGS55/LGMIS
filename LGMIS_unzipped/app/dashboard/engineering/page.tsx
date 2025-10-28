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
  LocationOn as LocationIcon,
  Assignment as AssignmentIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { format } from 'date-fns';
import { Billboard } from '@/types/shared';

// Mock data - replace with actual API calls
const mockBillboards: Billboard[] = [
  {
    id: '1',
    applicationNumber: 'BB-2025-001',
    applicantId: 'APP-001',
    location: {
      latitude: -15.3875,
      longitude: 28.3228,
      address: '123 Independence Ave'
    },
    size: {
      width: 6,
      height: 3,
      unit: 'meters'
    },
    tariffId: 'TARIFF-001',
    status: 'pending',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function EngineeringDashboard() {
  const [billboards] = useState<Billboard[]>(mockBillboards);

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Engineering - Billboard Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* Handle new billboard application */}}
        >
          New Application
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AssignmentIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Application Statistics</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Total Applications
                </Typography>
                <Typography variant="h4">
                  {billboards.length}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Pending Review
                </Typography>
                <Typography variant="h4">
                  {billboards.filter(b => b.status === 'pending').length}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Billboard Applications
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Application #</TableCell>
                    <TableCell>Location</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created Date</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {billboards.map((billboard) => (
                    <TableRow key={billboard.id}>
                      <TableCell>{billboard.applicationNumber}</TableCell>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LocationIcon sx={{ mr: 1, fontSize: 16 }} />
                          {billboard.location.address}
                        </Box>
                      </TableCell>
                      <TableCell>
                        {`${billboard.size.width}x${billboard.size.height} ${billboard.size.unit}`}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={billboard.status}
                          color={
                            billboard.status === 'approved'
                              ? 'success'
                              : billboard.status === 'rejected'
                              ? 'error'
                              : 'warning'
                          }
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        {format(billboard.createdAt, 'MMM d, yyyy')}
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