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
  Map as MapIcon,
  Assignment as AssignmentIcon,
  Construction as ConstructionIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { format } from 'date-fns';
import { Plot, BuildingPlan } from '@/types/planning';

// Mock data - replace with actual API calls
const mockPlots: Plot[] = [
  {
    id: '1',
    plotNumber: 'PLT-2025-001',
    location: {
      latitude: -15.3875,
      longitude: 28.3228,
      address: '123 Development Zone'
    },
    size: 1000,
    zoning: 'residential',
    status: 'available',
    gpsPoints: [
      { latitude: -15.3875, longitude: 28.3228, order: 1 },
      { latitude: -15.3876, longitude: 28.3229, order: 2 },
      { latitude: -15.3877, longitude: 28.3228, order: 3 },
      { latitude: -15.3876, longitude: 28.3227, order: 4 }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const mockBuildingPlans: BuildingPlan[] = [
  {
    id: '1',
    planNumber: 'BP-2025-001',
    plotId: 'PLT-2025-001',
    applicantId: 'APP-001',
    planType: 'new',
    status: 'pending',
    documents: [],
    checklistItems: [
      {
        id: '1',
        department: 'Engineering',
        requirement: 'Structural Analysis',
        status: 'pending',
      }
    ],
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

export default function PlanningDashboard() {
  const [plots] = useState<Plot[]>(mockPlots);
  const [buildingPlans] = useState<BuildingPlan[]>(mockBuildingPlans);
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Planning Management
        </Typography>
        <Box>
          <Button
            variant="contained"
            startIcon={<MapIcon />}
            onClick={() => {/* Handle new plot */}}
            sx={{ mr: 2 }}
          >
            Register Plot
          </Button>
          <Button
            variant="contained"
            startIcon={<ConstructionIcon />}
            onClick={() => {/* Handle new building plan */}}
          >
            New Building Plan
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <AssignmentIcon sx={{ mr: 1 }} />
              <Typography variant="h6">Planning Overview</Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Available Plots
                </Typography>
                <Typography variant="h4">
                  {plots.filter(p => p.status === 'available').length}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Pending Plans
                </Typography>
                <Typography variant="h4">
                  {buildingPlans.filter(p => p.status === 'pending').length}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Tabs value={activeTab} onChange={handleTabChange} sx={{ mb: 3 }}>
              <Tab
                label="Plot Inventory"
                icon={<MapIcon />}
                iconPosition="start"
              />
              <Tab
                label="Building Plans"
                icon={<ConstructionIcon />}
                iconPosition="start"
              />
            </Tabs>

            {activeTab === 0 && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell>Plot Number</TableCell>
                      <TableCell>Location</TableCell>
                      <TableCell>Size (m²)</TableCell>
                      <TableCell>Zoning</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>GPS Points</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {plots.map((plot) => (
                      <TableRow key={plot.id}>
                        <TableCell>{plot.plotNumber}</TableCell>
                        <TableCell>{plot.location.address}</TableCell>
                        <TableCell>{plot.size}</TableCell>
                        <TableCell style={{ textTransform: 'capitalize' }}>
                          {plot.zoning}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={plot.status}
                            color={plot.status === 'available' ? 'success' : 'warning'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>{plot.gpsPoints.length}</TableCell>
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
                      <TableCell>Plan Number</TableCell>
                      <TableCell>Plot Number</TableCell>
                      <TableCell>Type</TableCell>
                      <TableCell>Status</TableCell>
                      <TableCell>Checklist Progress</TableCell>
                      <TableCell>Documents</TableCell>
                      <TableCell>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {buildingPlans.map((plan) => (
                      <TableRow key={plan.id}>
                        <TableCell>{plan.planNumber}</TableCell>
                        <TableCell>{plan.plotId}</TableCell>
                        <TableCell style={{ textTransform: 'capitalize' }}>
                          {plan.planType}
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={plan.status}
                            color={
                              plan.status === 'approved'
                                ? 'success'
                                : plan.status === 'rejected'
                                ? 'error'
                                : 'warning'
                            }
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          {`${plan.checklistItems.filter(item => item.status === 'approved').length} of ${plan.checklistItems.length} items`}
                        </TableCell>
                        <TableCell>{plan.documents.length}</TableCell>
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