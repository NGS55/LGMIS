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
  Description as DocumentIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { format } from 'date-fns';

interface LeaseholdRecord {
  id: string;
  reference: string;
  applicant: string;
  parcelNumber: string;
  tenureType: 'residential' | 'commercial' | 'institutional';
  status: 'pending' | 'survey' | 'approved' | 'rejected';
  applicationDate: Date;
  expiryDate: Date;
  documents: { id: string; name: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const mockLeaseholds: LeaseholdRecord[] = [
  {
    id: '1',
    reference: 'LH-2025-001',
    applicant: 'Sunrise Developments Ltd',
    parcelNumber: 'PLT-458/2025',
    tenureType: 'commercial',
    status: 'survey',
    applicationDate: new Date('2025-03-12'),
    expiryDate: new Date('2055-03-12'),
    documents: [
      { id: 'doc-1', name: 'Survey Plan.pdf' },
      { id: 'doc-2', name: 'Payment Receipt.pdf' }
    ],
    createdAt: new Date('2025-03-12'),
    updatedAt: new Date('2025-04-02'),
  },
  {
    id: '2',
    reference: 'LH-2025-014',
    applicant: 'Mary Chileshe',
    parcelNumber: 'PLT-290/2025',
    tenureType: 'residential',
    status: 'approved',
    applicationDate: new Date('2025-02-01'),
    expiryDate: new Date('2055-02-01'),
    documents: [{ id: 'doc-3', name: 'Offer Letter.pdf' }],
    createdAt: new Date('2025-02-01'),
    updatedAt: new Date('2025-03-05'),
  },
];

export default function LeaseholdDashboard() {
  const [leaseholds] = useState<LeaseholdRecord[]>(mockLeaseholds);

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Leasehold Tenure
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              /* handle new application */
            }}
            sx={{ mr: 2 }}
          >
            New Application
          </Button>
          <Button
            variant="outlined"
            startIcon={<DocumentIcon />}
            onClick={() => {
              /* handle document upload */
            }}
          >
            Upload Document
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Leasehold Register
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Reference</TableCell>
                    <TableCell>Applicant</TableCell>
                    <TableCell>Parcel No.</TableCell>
                    <TableCell>Tenure Type</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Applied</TableCell>
                    <TableCell>Expires</TableCell>
                    <TableCell>Documents</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {leaseholds.map((leasehold) => (
                    <TableRow key={leasehold.id}>
                      <TableCell>{leasehold.reference}</TableCell>
                      <TableCell>{leasehold.applicant}</TableCell>
                      <TableCell>{leasehold.parcelNumber}</TableCell>
                      <TableCell sx={{ textTransform: 'capitalize' }}>
                        {leasehold.tenureType}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={leasehold.status}
                          color={
                            leasehold.status === 'approved'
                              ? 'success'
                              : leasehold.status === 'rejected'
                              ? 'error'
                              : 'warning'
                          }
                          size="small"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>{format(leasehold.applicationDate, 'MMM d, yyyy')}</TableCell>
                      <TableCell>{format(leasehold.expiryDate, 'MMM d, yyyy')}</TableCell>
                      <TableCell>{leasehold.documents.length}</TableCell>
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
        </Grid>
      </Grid>
    </Box>
  );
}
