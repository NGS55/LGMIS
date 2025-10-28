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
  LockReset as ResetIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { format } from 'date-fns';
import type { User } from '@/types/shared';

const mockUsers: User[] = [
  {
    id: '1',
    username: 'jdoe',
    email: 'jdoe@example.com',
    role: 'Administrator',
    isActive: true,
    personalDetails: {
      firstName: 'John',
      lastName: 'Doe',
      phoneNumber: '+260 977 000000',
      address: '123 Civic Way',
    },
    createdAt: new Date('2025-01-10'),
    updatedAt: new Date('2025-03-15'),
  },
  {
    id: '2',
    username: 'asmith',
    email: 'asmith@example.com',
    role: 'Valuation Officer',
    isActive: false,
    personalDetails: {
      firstName: 'Alice',
      lastName: 'Smith',
      phoneNumber: '+260 977 111111',
      address: '456 Government Rd',
    },
    createdAt: new Date('2025-02-20'),
    updatedAt: new Date('2025-04-05'),
  },
];

export default function UserManagementPage() {
  const [users] = useState<User[]>(mockUsers);

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          User Management
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => {
              /* handle new user */
            }}
            sx={{ mr: 2 }}
          >
            New User
          </Button>
          <Button
            variant="outlined"
            startIcon={<ResetIcon />}
            onClick={() => {
              /* handle bulk reset */
            }}
          >
            Reset Passwords
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              User Directory
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Username</TableCell>
                    <TableCell>Full Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Role</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Created</TableCell>
                    <TableCell>Updated</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>{user.username}</TableCell>
                      <TableCell>{`${user.personalDetails.firstName} ${user.personalDetails.lastName}`}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.role}</TableCell>
                      <TableCell>
                        <Chip
                          label={user.isActive ? 'Active' : 'Inactive'}
                          color={user.isActive ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>{format(user.createdAt, 'MMM d, yyyy')}</TableCell>
                      <TableCell>{format(user.updatedAt, 'MMM d, yyyy')}</TableCell>
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
