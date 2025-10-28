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
} from '@mui/material';
import { Add as AddIcon, Visibility as ViewIcon, Edit as EditIcon } from '@mui/icons-material';
import { useState } from 'react';
import { format } from 'date-fns';
import { MinuteBook } from '@/types/shared';

// Mock data - replace with actual API calls
const mockMinutes: MinuteBook[] = [
  {
    id: '1',
    referenceNumber: 'MIN-2025-001',
    meetingDate: new Date('2025-10-15'),
    agenda: 'Monthly Council Meeting',
    decisions: 'Approved 3 leasehold applications',
    attachments: [
      {
        id: '1',
        fileName: 'minutes.pdf',
        fileType: 'application/pdf',
        fileSize: 1024,
        url: '/files/minutes.pdf'
      }
    ],
    leaseholdApprovals: ['LA-2025-001', 'LA-2025-002', 'LA-2025-003'],
    createdAt: new Date('2025-10-15'),
    updatedAt: new Date('2025-10-15')
  }
];

export default function AdministrationDashboard() {
  const [minutes] = useState<MinuteBook[]>(mockMinutes);

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Administration Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => {/* Handle new minute book entry */}}
        >
          New Minutes
        </Button>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Minute Book Register
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Reference Number</TableCell>
                    <TableCell>Meeting Date</TableCell>
                    <TableCell>Agenda</TableCell>
                    <TableCell>Attachments</TableCell>
                    <TableCell>Leasehold Approvals</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {minutes.map((minute) => (
                    <TableRow key={minute.id}>
                      <TableCell>{minute.referenceNumber}</TableCell>
                      <TableCell>{format(minute.meetingDate, 'MMM d, yyyy')}</TableCell>
                      <TableCell>{minute.agenda}</TableCell>
                      <TableCell>{minute.attachments.length}</TableCell>
                      <TableCell>{minute.leaseholdApprovals.length}</TableCell>
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