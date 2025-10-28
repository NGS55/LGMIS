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
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Home as HomeIcon,
  People as PeopleIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { format } from 'date-fns';
import { Property } from '@/types/shared';

interface HousingApplication {
  id: string;
  applicationNumber: string;
  applicantName: string;
  propertyType: 'house' | 'apartment' | 'land';
  status: 'pending' | 'inspection' | 'approved' | 'rejected';
  settlementArea: string;
  householdSize: number;
  monthlyIncome: number;
  applicationDate: Date;
  documents: { id: string; type: string; name: string }[];
  createdAt: Date;
  updatedAt: Date;
}

// Mock data - replace with actual API calls
const mockApplications: HousingApplication[] = [
  {
    id: '1',
    applicationNumber: 'HA-2025-001',
    applicantName: 'John Doe',
    propertyType: 'house',
    status: 'pending',
    settlementArea: 'Riverside Extension',
    householdSize: 4,
    monthlyIncome: 15000,
    applicationDate: new Date(),
    documents: [
      { id: '1', type: 'identity', name: 'ID Document.pdf' },
      { id: '2', type: 'proof_of_income', name: 'Payslip.pdf' }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockProperties: Property[] = [
  {
    id: '1',
    title: 'Family Home Unit A1',
    plotNumber: 'PLT-2025-001',
    size: 250,
    location: {
      latitude: -15.3875,
      longitude: 28.3228,
      address: '45 Riverside Extension'
    },
    owner: 'Housing Authority',
    propertyType: 'residential',
    status: 'active',
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function HousingDashboard() {
  const [applications] = useState<HousingApplication[]>(mockApplications);
  const [properties] = useState<Property[]>(mockProperties);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

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
          Housing Management
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {/* Handle new application */}}
            sx={{ mr: 2 }}
          >
            New Application
          </Button>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            onClick={() => {/* Handle new property */}}
          >
            Register Property
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <PeopleIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Overview</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Total Applications
                </Typography>
                <Typography variant="h4">
                  {applications.length}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Available Properties
                </Typography>
                <Typography variant="h4">
                  {properties.length}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Housing Applications" />
              <Tab label="Property Register" />
            </Tabs>

            {activeTab === 0 && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Application #</TableCell>
                      <TableCell>Applicant</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Settlement</TableCell>
                      <TableCell>Household Size</TableCell>
                      <TableCell>Monthly Income</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {applications.map((application) => (
                      <TableRow key={application.id}>
                        <TableCell>{application.applicationNumber}</TableCell>
                        <TableCell>{application.applicantName}</TableCell>
                        <TableCell style={{ textTransform: 'capitalize' }}>
                          {application.propertyType}
                        </TableCell>
                        <TableCell>{application.settlementArea}</TableCell>
                        <TableCell>{application.householdSize}</TableCell>
                        <TableCell>{formatCurrency(application.monthlyIncome)}</TableCell>
                        <TableCell>
                          <Chip
                            label={application.status}
                            color={
                              application.status === 'approved'
                                ? 'success'
                                : application.status === 'rejected'
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
            )}

            {activeTab === 1 && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Plot Number</TableCell>
                      <TableCell>Title</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Size (m²)</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {properties.map((property) => (
                      <TableRow key={property.id}>
                        <TableCell>{property.plotNumber}</TableCell>
                        <TableCell>{property.title}</TableCell>
                        <TableCell style={{ textTransform: 'capitalize' }}>
                          {property.propertyType}
                        </TableCell>
                        <TableCell>{property.size}</TableCell>
                        <TableCell>{property.location.address}</TableCell>
                        <TableCell>
                          <Chip
                            label={property.status}
                            color={property.status === 'active' ? 'success' : 'warning'}
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
            )}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}
