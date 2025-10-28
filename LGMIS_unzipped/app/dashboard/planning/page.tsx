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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Map as MapIcon,
  Assignment as AssignmentIcon,
  Construction as ConstructionIcon,
  ExpandMore as ExpandMoreIcon,
  Layers as LayersIcon,
  Place as PlaceIcon,
  PictureAsPdf as AttachmentIcon,
} from '@mui/icons-material';
import { ChangeEvent, useMemo, useState } from 'react';
import { format } from 'date-fns';
import { Plot, BuildingPlan, PlanningArea, ZoningType, PlotStatus, GpsPoint } from '@/types/planning';

// Mock data - replace with actual API calls
const planningAreas: PlanningArea[] = [
  {
    id: 'AREA-01',
    name: 'North Planning Area',
    description: 'Mixed-use corridor adjacent to the central business district.',
  },
  {
    id: 'AREA-02',
    name: 'Eastern Expansion Zone',
    description: 'Rapidly growing residential zone earmarked for new amenities.',
  },
];

const mockPlots: Plot[] = [
  {
    id: '1',
    plotNumber: 'PLT-2025-001',
    provisionalPlotNumber: 'PLT-PROV-2025-015',
    location: {
      latitude: -15.3875,
      longitude: 28.3228,
      address: '123 Development Zone',
    },
    size: 1000,
    zoning: 'residential',
    status: 'available',
    applicantId: 'APP-001',
    area: planningAreas[0],
    gpsPoints: [
      { latitude: -15.3875, longitude: 28.3228, order: 1 },
      { latitude: -15.3876, longitude: 28.3229, order: 2 },
      { latitude: -15.3877, longitude: 28.3228, order: 3 },
      { latitude: -15.3876, longitude: 28.3227, order: 4 },
    ],
    rezoningRequests: [
      {
        id: 'RZ-001',
        requestNumber: 'RZ-2025-001',
        currentZoning: 'residential',
        requestedZoning: 'commercial',
        status: 'submitted',
        notes: 'Seeking approval for mixed-use complex.',
        committeeDecision: undefined,
        meetingDate: undefined,
        attachments: [],
        createdAt: new Date('2025-03-12'),
        updatedAt: new Date('2025-03-12'),
      },
    ],
    attachments: [
      {
        id: 'ATT-001',
        fileName: 'survey-plan.pdf',
        fileType: 'application/pdf',
        fileSize: 512000,
        url: '#',
      },
      {
        id: 'ATT-002',
        fileName: 'applicant-letter.pdf',
        fileType: 'application/pdf',
        fileSize: 210000,
        url: '#',
      },
    ],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
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
  const [openForm, setOpenForm] = useState(false);
  const [formValues, setFormValues] = useState({
    plotNumber: '',
    provisionalPlotNumber: '',
    areaId: '',
    zoning: 'residential' as ZoningType,
    status: 'available' as PlotStatus,
    size: '',
    latitude: '',
    longitude: '',
    notes: '',
  });
  const [gpsPoints, setGpsPoints] = useState<GpsPoint[]>([]);

  const canSubmit = useMemo(() => {
    return (
      formValues.plotNumber.trim() !== '' &&
      formValues.zoning &&
      formValues.status &&
      Number(formValues.size) > 0 &&
      gpsPoints.length >= 3
    );
  }, [formValues, gpsPoints]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleOpenForm = () => setOpenForm(true);

  const handleCloseForm = () => {
    setOpenForm(false);
    setFormValues({
      plotNumber: '',
      provisionalPlotNumber: '',
      areaId: '',
      zoning: 'residential',
      status: 'available',
      size: '',
      latitude: '',
      longitude: '',
      notes: '',
    });
    setGpsPoints([]);
  };

  const handleFormChange =
    (field: keyof typeof formValues) =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleAddGpsPoint = () => {
    const lat = Number(formValues.latitude);
    const lng = Number(formValues.longitude);
    if (Number.isFinite(lat) && Number.isFinite(lng)) {
      setGpsPoints((prev) => [
        ...prev,
        { latitude: lat, longitude: lng, order: prev.length + 1 },
      ]);
      setFormValues((prev) => ({ ...prev, latitude: '', longitude: '' }));
    }
  };

  const handleRemovePoint = (order: number) => {
    setGpsPoints((prev) =>
      prev
        .filter((point) => point.order !== order)
        .map((point, index) => ({ ...point, order: index + 1 }))
    );
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
            onClick={handleOpenForm}
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
              <Tab label="Plot Inventory" icon={<MapIcon />} iconPosition="start" />
              <Tab label="Building Plans" icon={<ConstructionIcon />} iconPosition="start" />
            </Tabs>

            {activeTab === 0 && (
              <Stack spacing={2}>
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
                          <TableCell>
                            <Stack spacing={0.5}>
                              <Typography variant="body2">{plot.location.address}</Typography>
                              {plot.provisionalPlotNumber && (
                                <Typography variant="caption" color="text.secondary">
                                  Provisional: {plot.provisionalPlotNumber}
                                </Typography>
                              )}
                              {plot.area && (
                                <Typography variant="caption" color="text.secondary">
                                  Area: {plot.area.name}
                                </Typography>
                              )}
                            </Stack>
                          </TableCell>
                          <TableCell>{plot.size.toLocaleString()}</TableCell>
                          <TableCell sx={{ textTransform: 'capitalize' }}>{plot.zoning}</TableCell>
                          <TableCell>
                            <Chip
                              label={plot.status}
                              color={plot.status === 'available' ? 'success' : 'warning'}
                              size="small"
                              sx={{ textTransform: 'capitalize' }}
                            />
                          </TableCell>
                          <TableCell>
                            <Tooltip
                              title={
                                <Stack spacing={0.5}>
                                  {plot.gpsPoints.map((point) => (
                                    <Typography key={point.order} variant="caption">
                                      {point.order}. {point.latitude.toFixed(5)}, {point.longitude.toFixed(5)}
                                    </Typography>
                                  ))}
                                </Stack>
                              }
                            >
                              <Chip
                                icon={<PlaceIcon fontSize="small" />}
                                label={`${plot.gpsPoints.length} points`}
                                size="small"
                                variant="outlined"
                              />
                            </Tooltip>
                          </TableCell>
                          <TableCell>
                            <IconButton size="small" onClick={() => {/* Handle view */}}>
                              <ViewIcon />
                            </IconButton>
                            <IconButton size="small" onClick={() => {/* Handle edit */}}>
                              <EditIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>

                <Accordion defaultExpanded>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <LayersIcon fontSize="small" /> Plot Relationships
                    </Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container spacing={2}>
                      {plots.map((plot) => (
                        <Grid item xs={12} md={6} key={`${plot.id}-relationships`}>
                          <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                            <Stack spacing={1}>
                              <Typography variant="subtitle2">{plot.plotNumber}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                Applicant: {plot.applicantId ?? 'Not assigned'}
                              </Typography>
                              <Divider />
                              <Typography variant="body2" fontWeight={600}>
                                Rezoning Requests
                              </Typography>
                              {plot.rezoningRequests.length === 0 ? (
                                <Typography variant="body2" color="text.secondary">
                                  No rezoning activity recorded.
                                </Typography>
                              ) : (
                                <Stack spacing={1}>
                                  {plot.rezoningRequests.map((request) => (
                                    <Paper key={request.id} variant="outlined" sx={{ p: 1.5 }}>
                                      <Stack spacing={0.5}>
                                        <Typography variant="body2">
                                          {request.requestNumber} · {format(request.createdAt, 'MMM d, yyyy')}
                                        </Typography>
                                        <Typography variant="caption" color="text.secondary">
                                          {request.currentZoning} → {request.requestedZoning}
                                        </Typography>
                                      </Stack>
                                      <Chip
                                        label={request.status}
                                        size="small"
                                        variant="outlined"
                                        color={
                                          request.status === 'approved'
                                            ? 'success'
                                            : request.status === 'rejected'
                                            ? 'error'
                                            : 'warning'
                                        }
                                        sx={{ textTransform: 'capitalize', mt: 1, width: 'fit-content' }}
                                      />
                                      {request.attachments.length > 0 && (
                                        <Typography variant="caption" color="text.secondary" sx={{ mt: 0.5 }}>
                                          {request.attachments.length} attachment(s)
                                        </Typography>
                                      )}
                                      {request.notes && (
                                        <Typography variant="caption" sx={{ mt: 0.5 }}>
                                          {request.notes}
                                        </Typography>
                                      )}
                                    </Paper>
                                  ))}
                                </Stack>
                              )}
                              <Divider />
                              <Typography variant="body2" fontWeight={600}>
                                Attachments
                              </Typography>
                              {plot.attachments.length === 0 ? (
                                <Typography variant="body2" color="text.secondary">
                                  No attachments available.
                                </Typography>
                              ) : (
                                <Stack spacing={0.5}>
                                  {plot.attachments.map((file) => (
                                    <Chip
                                      key={file.id}
                                      icon={<AttachmentIcon fontSize="small" />}
                                      label={file.fileName}
                                      size="small"
                                      variant="outlined"
                                    />
                                  ))}
                                </Stack>
                              )}
                            </Stack>
                          </Paper>
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              </Stack>
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
                          <IconButton size="small" onClick={() => {/* Handle view */}}>
                            <ViewIcon />
                          </IconButton>
                          <IconButton size="small" onClick={() => {/* Handle edit */}}>
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

      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="md" fullWidth>
        <DialogTitle>Register New Plot</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Stack spacing={2}>
              <Typography variant="subtitle1">Plot Identifiers</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Plot Number"
                    value={formValues.plotNumber}
                    onChange={handleFormChange('plotNumber')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Provisional Plot Number"
                    value={formValues.provisionalPlotNumber}
                    onChange={handleFormChange('provisionalPlotNumber')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Planning Area"
                    value={formValues.areaId}
                    onChange={handleFormChange('areaId')}
                    fullWidth
                  >
                    <MenuItem value="">-- Select area --</MenuItem>
                    {planningAreas.map((area) => (
                      <MenuItem key={area.id} value={area.id}>
                        {area.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Size (m²)"
                    value={formValues.size}
                    onChange={handleFormChange('size')}
                    type="number"
                    inputProps={{ min: 0 }}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Zoning"
                    value={formValues.zoning}
                    onChange={(event) =>
                      setFormValues((prev) => ({
                        ...prev,
                        zoning: event.target.value as ZoningType,
                      }))
                    }
                    fullWidth
                  >
                    {(['residential', 'commercial', 'industrial', 'agricultural', 'mixed'] as ZoningType[]).map(
                      (zone) => (
                        <MenuItem key={zone} value={zone}>
                          {zone.charAt(0).toUpperCase() + zone.slice(1)}
                        </MenuItem>
                      )
                    )}
                  </TextField>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    select
                    label="Status"
                    value={formValues.status}
                    onChange={(event) =>
                      setFormValues((prev) => ({
                        ...prev,
                        status: event.target.value as PlotStatus,
                      }))
                    }
                    fullWidth
                  >
                    {(['available', 'allocated', 'developed', 'reserved'] as PlotStatus[]).map((status) => (
                      <MenuItem key={status} value={status}>
                        {status.charAt(0).toUpperCase() + status.slice(1)}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle1">Spatial Metadata</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Latitude"
                    value={formValues.latitude}
                    onChange={handleFormChange('latitude')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Longitude"
                    value={formValues.longitude}
                    onChange={handleFormChange('longitude')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Button variant="outlined" onClick={handleAddGpsPoint} sx={{ height: '100%' }}>
                    Add GPS Point
                  </Button>
                </Grid>
              </Grid>
              {gpsPoints.length > 0 ? (
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell>Order</TableCell>
                      <TableCell>Latitude</TableCell>
                      <TableCell>Longitude</TableCell>
                      <TableCell />
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {gpsPoints.map((point) => (
                      <TableRow key={point.order}>
                        <TableCell>{point.order}</TableCell>
                        <TableCell>{point.latitude}</TableCell>
                        <TableCell>{point.longitude}</TableCell>
                        <TableCell align="right">
                          <Button size="small" onClick={() => handleRemovePoint(point.order)}>
                            Remove
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Add at least three GPS points to define the parcel boundary.
                </Typography>
              )}
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle1">Notes</Typography>
              <TextField
                label="Planning Notes"
                value={formValues.notes}
                onChange={handleFormChange('notes')}
                multiline
                minRows={3}
                fullWidth
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!canSubmit}
            onClick={() => {
              /* Submit integration pending */
              handleCloseForm();
            }}
          >
            Save Plot
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
