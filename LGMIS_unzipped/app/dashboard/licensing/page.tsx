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
  Tab,
  Tabs,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Business as BusinessIcon,
  LocalBar as LiquorIcon,
  Refresh as RenewIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { format } from 'date-fns';
import { License, LicenseType } from '@/types/licensing';

// Mock data - replace with actual API calls
const mockLicenses: License[] = [
  {
    id: '1',
    licenseNumber: 'BL-2025-001',
    type: 'business',
    applicantId: 'APP-001',
    businessDetails: {
      name: 'Sample Business Ltd',
      type: 'Retail',
      registrationNumber: 'REG123',
      tradingName: 'Sample Store',
      physicalAddress: '123 Business Avenue',
      contactPerson: 'John Doe',
      phone: '+260 97 1234567',
      email: 'contact@sample.com',
      employees: 10
    },
    financialAccount: {
      accountNumber: 'ACC001',
      balance: 0,
      lastPaymentDate: new Date('2025-09-15'),
      lastPaymentAmount: 5000
    },
    validFrom: new Date('2025-01-01'),
    validUntil: new Date('2025-12-31'),
    status: 'active',
    fees: [
      {
        id: '1',
        type: 'Application',
        amount: 1000,
        dueDate: new Date('2025-01-01'),
        paidAmount: 1000,
        paidDate: new Date('2025-01-01'),
        status: 'paid'
      }
    ],
    documents: [],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const licenseTypes: LicenseType[] = ['business', 'liquor', 'trading', 'special'];

export default function LicensingDashboard() {
  const [licenses] = useState<License[]>(mockLicenses);
  const [activeTab, setActiveTab] = useState<LicenseType>('business');

  const handleTabChange = (event: React.SyntheticEvent, newValue: LicenseType) => {
    setActiveTab(newValue);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW'
    }).format(amount);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'success';
      case 'expired':
      case 'suspended':
        return 'error';
      case 'pending':
        return 'warning';
      default:
        return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Licensing Management
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {/* Handle new license */}}
          >
            New License
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <BusinessIcon sx={{ mr: 1 }} />
              <Typography variant="h6">License Overview</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Active Licenses
                </Typography>
                <Typography variant="h4">
                  {licenses.filter(l => l.status === 'active').length}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Pending Renewals
                </Typography>
                <Typography variant="h4">
                  {licenses.filter(l => {
                    const daysUntilExpiry = Math.ceil((l.validUntil.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24));
                    return daysUntilExpiry <= 30 && l.status === 'active';
                  }).length}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              sx={{ mb: 3 }}
              variant="scrollable"
              scrollButtons="auto"
            >
              {licenseTypes.map((type) => (
                <Tab
                  key={type}
                  value={type}
                  label={type.charAt(0).toUpperCase() + type.slice(1)}
                  icon={type === 'liquor' ? <LiquorIcon /> : <BusinessIcon />}
                  iconPosition="start"
                />
              ))}
            </Tabs>

            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>License Number</TableCell>
                    <TableCell>Business Name</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Valid Until</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Balance</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {licenses
                    .filter(license => license.type === activeTab)
                    .map((license) => (
                      <TableRow key={license.id}>
                        <TableCell>{license.licenseNumber}</TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {license.businessDetails.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {license.businessDetails.tradingName}
                          </Typography>
                        </TableCell>
                        <TableCell style={{ textTransform: 'capitalize' }}>
                          {license.type}
                        </TableCell>
                        <TableCell>{format(license.validUntil, 'MMM d, yyyy')}</TableCell>
                        <TableCell>
                          <Chip
                            label={license.status}
                            color={getStatusColor(license.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{formatCurrency(license.financialAccount.balance)}</TableCell>
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
                          <IconButton
                            size="small"
                            onClick={() => {/* Handle renewal */}}
                          >
                            <RenewIcon />
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