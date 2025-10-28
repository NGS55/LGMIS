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
  Gavel as GavelIcon,
  Person as PersonIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { format } from 'date-fns';
import { FileAttachment } from '@/types/shared';

interface LegalClient {
  id: string;
  clientNumber: string;
  name: string;
  type: 'individual' | 'company';
  identityNumber: string;
  contactInfo: {
    phone: string;
    email: string;
    address: string;
  };
  applications: string[];
  createdAt: Date;
  updatedAt: Date;
}

interface LegalOwnership {
  id: string;
  caseNumber: string;
  clientId: string;
  propertyId: string;
  status: 'pending' | 'approved' | 'rejected' | 'review';
  plotDetails: {
    plotNumber: string;
    location: string;
    size: number;
  };
  documents: FileAttachment[];
  approvalSteps: {
    step: string;
    status: 'pending' | 'completed';
    date?: Date;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

// Mock data - replace with actual API calls
const mockClients: LegalClient[] = [
  {
    id: '1',
    clientNumber: 'LC-2025-001',
    name: 'John Doe',
    type: 'individual',
    identityNumber: 'ID123456',
    contactInfo: {
      phone: '+260 97 1234567',
      email: 'john@example.com',
      address: '123 Independence Ave'
    },
    applications: ['LA-001', 'LA-002'],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockOwnerships: LegalOwnership[] = [
  {
    id: '1',
    caseNumber: 'LO-2025-001',
    clientId: '1',
    propertyId: 'PROP-001',
    status: 'pending',
    plotDetails: {
      plotNumber: 'PLT-001',
      location: 'Riverside Extension',
      size: 250
    },
    documents: [
      {
        id: '1',
        fileName: 'deed.pdf',
        fileType: 'application/pdf',
        fileSize: 1024,
        url: '/files/deed.pdf'
      }
    ],
    approvalSteps: [
      { step: 'Document Verification', status: 'completed', date: new Date() },
      { step: 'Legal Review', status: 'pending' },
      { step: 'Final Approval', status: 'pending' }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function LegalDashboard() {
  const [clients] = useState<LegalClient[]>(mockClients);
  const [ownerships] = useState<LegalOwnership[]>(mockOwnerships);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Legal Management
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<PersonIcon />}
            onClick={() => {/* Handle new client */}}
            sx={{ mr: 2 }}
          >
            New Client
          </Button>
          <Button
            variant="contained"
            startIcon={<GavelIcon />}
            onClick={() => {/* Handle new ownership case */}}
          >
            New Ownership Case
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <GavelIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Case Overview</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Active Clients
                </Typography>
                <Typography variant="h4">
                  {clients.length}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Pending Cases
                </Typography>
                <Typography variant="h4">
                  {ownerships.filter(o => o.status === 'pending').length}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab label="Clients" />
              <Tab label="Ownership Cases" />
            </Tabs>

            {activeTab === 0 && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Client Number</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Identity Number</TableCell>
                      <TableCell>Contact</TableCell>
                      <TableCell>Applications</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {clients.map((client) => (
                      <TableRow key={client.id}>
                        <TableCell>{client.clientNumber}</TableCell>
                        <TableCell>{client.name}</TableCell>
                        <TableCell style={{ textTransform: 'capitalize' }}>
                          {client.type}
                        </TableCell>
                        <TableCell>{client.identityNumber}</TableCell>
                        <TableCell>
                          <Typography variant="body2">{client.contactInfo.phone}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {client.contactInfo.email}
                          </Typography>
                        </TableCell>
                        <TableCell>{client.applications.length}</TableCell>
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
                      <TableCell>Case Number</TableCell>
                      <TableCell>Plot Details</TableCell>
                      <TableCell>Documents</TableCell>
                      <TableCell>Progress</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {ownerships.map((ownership) => (
                      <TableRow key={ownership.id}>
                        <TableCell>{ownership.caseNumber}</TableCell>
                        <TableCell>
                          <Typography variant="body2">
                            {ownership.plotDetails.plotNumber}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {ownership.plotDetails.location}
                          </Typography>
                        </TableCell>
                        <TableCell>{ownership.documents.length}</TableCell>
                        <TableCell>
                          {`${ownership.approvalSteps.filter(s => s.status === 'completed').length} of ${ownership.approvalSteps.length} steps`}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={ownership.status}
                            color={
                              ownership.status === 'approved'
                                ? 'success'
                                : ownership.status === 'rejected'
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
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}