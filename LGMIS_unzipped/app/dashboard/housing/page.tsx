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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
  TextField,
  MenuItem,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  FormControlLabel,
  Checkbox,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Home as HomeIcon,
  People as PeopleIcon,
  PictureAsPdf as PdfIcon,
  Description as DescriptionIcon,
  LocationOn as LocationOnIcon,
  ExpandMore as ExpandMoreIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { format } from 'date-fns';
import { Property } from '@/types/shared';
import {
  HousingApplicationStatus,
  OwnershipApplicationHousing,
  HouseholdMember,
} from '@/types/housing';

// Mock data - replace with actual API calls
const mockApplications: OwnershipApplicationHousing[] = [
  {
    id: '1',
    applicationNumber: 'HA-2025-001',
    applicantName: 'John Doe',
    propertyType: 'house',
    status: 'inspection',
    settlementArea: 'Riverside Extension',
    householdSize: 4,
    monthlyIncome: 15000,
    applicationDate: new Date(),
    documents: [
      {
        id: 'DOC-1',
        fileName: 'ID Document.pdf',
        fileType: 'application/pdf',
        fileSize: 256000,
        url: '#',
      },
      {
        id: 'DOC-2',
        fileName: 'Proof of Income.pdf',
        fileType: 'application/pdf',
        fileSize: 178000,
        url: '#',
      },
    ],
    inspectionReports: [
      {
        id: 'INSP-1',
        inspectionDate: new Date('2025-02-15'),
        inspector: 'Mary Mumba',
        status: 'pending',
        comments: 'Initial inspection scheduled.',
        attachments: [],
      },
    ],
    settlementRecord: {
      id: 'SET-1',
      settlementArea: 'Riverside Extension',
      plotReference: 'PLT-2025-001',
      coordinates: { latitude: -15.3875, longitude: 28.3228 },
      accessToUtilities: { water: true, electricity: true, sanitation: false },
    },
    householdRecord: {
      id: 'HH-1',
      headOfHousehold: 'John Doe',
      contactNumber: '+260977123456',
      members: [
        { id: 'HHM-1', name: 'Jane Doe', age: 34, relationship: 'Spouse', employed: true },
        { id: 'HHM-2', name: 'Junior Doe', age: 8, relationship: 'Child', employed: false },
      ],
      totalIncome: 15000,
    },
    approvalDetails: undefined,
    createdAt: new Date(),
    updatedAt: new Date(),
    caseLocked: false,
  },
  {
    id: '2',
    applicationNumber: 'HA-2025-014',
    applicantName: 'Lucy Banda',
    propertyType: 'apartment',
    status: 'confirmed',
    settlementArea: 'Central Estates',
    householdSize: 2,
    monthlyIncome: 22000,
    applicationDate: new Date('2025-01-12'),
    documents: [
      {
        id: 'DOC-5',
        fileName: 'TenancyAgreement.pdf',
        fileType: 'application/pdf',
        fileSize: 320000,
        url: '#',
      },
    ],
    inspectionReports: [
      {
        id: 'INSP-4',
        inspectionDate: new Date('2025-01-20'),
        inspector: 'Mwila Chileshe',
        status: 'passed',
        comments: 'All occupancy requirements met.',
        attachments: [],
      },
    ],
    settlementRecord: {
      id: 'SET-3',
      settlementArea: 'Central Estates',
      plotReference: 'APT-45B',
      coordinates: { latitude: -15.409, longitude: 28.301 },
      accessToUtilities: { water: true, electricity: true, sanitation: true },
    },
    householdRecord: {
      id: 'HH-3',
      headOfHousehold: 'Lucy Banda',
      contactNumber: '+260971223344',
      members: [
        { id: 'HHM-5', name: 'Chanda Banda', age: 3, relationship: 'Child', employed: false },
      ],
      totalIncome: 22000,
    },
    approvalDetails: {
      id: 'APR-11',
      approvalDate: new Date('2025-01-25'),
      approvedBy: 'Housing Board',
      comments: 'Confirmed and locked.',
      validUntil: new Date('2026-01-24'),
      conditions: ['Subject to annual renewal.'],
    },
    createdAt: new Date('2025-01-12'),
    updatedAt: new Date('2025-01-25'),
    caseLocked: true,
    reasonLocked: 'Case confirmed by Housing Board.',
  },
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
  const [applications, setApplications] = useState<OwnershipApplicationHousing[]>(mockApplications);
  const [properties] = useState<Property[]>(mockProperties);
  const [activeTab, setActiveTab] = useState(0);
  const [openForm, setOpenForm] = useState(false);
  const [documents, setDocuments] = useState<Array<{ id: string; name: string; type: string }>>([]);
  const [householdMembers, setHouseholdMembers] = useState<HouseholdMember[]>([]);
  const [formState, setFormState] = useState({
    applicantName: '',
    propertyType: 'house' as OwnershipApplicationHousing['propertyType'],
    settlementArea: '',
    monthlyIncome: '',
    documentName: '',
    documentType: 'identity',
    headOfHousehold: '',
    contactNumber: '',
    memberName: '',
    memberAge: '',
    memberRelationship: '',
    memberEmployed: false,
    inspectionDate: '',
    inspector: '',
    inspectionComments: '',
    plotReference: '',
    latitude: '',
    longitude: '',
    accessWater: true,
    accessElectricity: true,
    accessSanitation: false,
  });

  const canSubmit =
    formState.applicantName.trim() !== '' &&
    formState.settlementArea.trim() !== '' &&
    Number(formState.monthlyIncome) > 0 &&
    documents.length > 0 &&
    householdMembers.length > 0 &&
    formState.inspectionDate !== '' &&
    formState.inspector.trim() !== '';

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const resetForm = () => {
    setFormState({
      applicantName: '',
      propertyType: 'house',
      settlementArea: '',
      monthlyIncome: '',
      documentName: '',
      documentType: 'identity',
      headOfHousehold: '',
      contactNumber: '',
      memberName: '',
      memberAge: '',
      memberRelationship: '',
      memberEmployed: false,
      inspectionDate: '',
      inspector: '',
      inspectionComments: '',
      plotReference: '',
      latitude: '',
      longitude: '',
      accessWater: true,
      accessElectricity: true,
      accessSanitation: false,
    });
    setDocuments([]);
    setHouseholdMembers([]);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    resetForm();
  };

  const handleFieldChange =
    (field: keyof typeof formState) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const value =
        event.target.type === 'checkbox' ? (event.target as HTMLInputElement).checked : event.target.value;
      setFormState((prev) => ({ ...prev, [field]: value }));
    };

  const handleAddDocument = () => {
    if (!formState.documentName.trim()) {
      return;
    }
    setDocuments((prev) => [
      ...prev,
      { id: `DOC-${Date.now()}`, name: formState.documentName.trim(), type: formState.documentType },
    ]);
    setFormState((prev) => ({ ...prev, documentName: '' }));
  };

  const handleRemoveDocument = (id: string) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  const handleAddHouseholdMember = () => {
    if (!formState.memberName.trim() || !formState.memberRelationship.trim() || !formState.memberAge) {
      return;
    }
    setHouseholdMembers((prev) => [
      ...prev,
      {
        id: `HHM-${Date.now()}`,
        name: formState.memberName.trim(),
        age: Number(formState.memberAge),
        relationship: formState.memberRelationship.trim(),
        employed: formState.memberEmployed,
      },
    ]);
    setFormState((prev) => ({
      ...prev,
      memberName: '',
      memberAge: '',
      memberRelationship: '',
      memberEmployed: false,
    }));
  };

  const handleRemoveMember = (id: string) => {
    setHouseholdMembers((prev) => prev.filter((member) => member.id !== id));
  };

  const handleCreateApplication = () => {
    if (!canSubmit) return;

    const newApplication: OwnershipApplicationHousing = {
      id: `APP-${Date.now()}`,
      applicationNumber: `HA-${new Date().getFullYear()}-${String(applications.length + 1).padStart(3, '0')}`,
      applicantName: formState.applicantName.trim(),
      propertyType: formState.propertyType,
      status: 'pending',
      settlementArea: formState.settlementArea.trim(),
      householdSize: householdMembers.length,
      monthlyIncome: Number(formState.monthlyIncome),
      applicationDate: new Date(),
      documents: documents.map((doc) => ({
        id: doc.id,
        fileName: doc.name,
        fileType: 'application/pdf',
        fileSize: 0,
        url: '#',
      })),
      inspectionReports: [
        {
          id: `INSP-${Date.now()}`,
          inspectionDate: new Date(formState.inspectionDate),
          inspector: formState.inspector.trim(),
          status: 'pending',
          comments: formState.inspectionComments.trim(),
          attachments: [],
        },
      ],
      settlementRecord: {
        id: `SET-${Date.now()}`,
        settlementArea: formState.settlementArea.trim(),
        plotReference: formState.plotReference.trim() || undefined,
        coordinates:
          formState.latitude && formState.longitude
            ? {
                latitude: Number(formState.latitude),
                longitude: Number(formState.longitude),
              }
            : undefined,
        accessToUtilities: {
          water: formState.accessWater,
          electricity: formState.accessElectricity,
          sanitation: formState.accessSanitation,
        },
      },
      householdRecord: {
        id: `HH-${Date.now()}`,
        headOfHousehold: formState.headOfHousehold.trim() || formState.applicantName.trim(),
        contactNumber: formState.contactNumber.trim(),
        members: householdMembers,
        totalIncome: Number(formState.monthlyIncome),
      },
      approvalDetails: undefined,
      createdAt: new Date(),
      updatedAt: new Date(),
      caseLocked: false,
    };

    setApplications((prev) => [newApplication, ...prev]);
    handleCloseForm();
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-ZM', {
      style: 'currency',
      currency: 'ZMW'
    }).format(amount);
  };

  const getStatusColor = (status: HousingApplicationStatus) => {
    switch (status) {
      case 'approved':
      case 'confirmed':
        return 'success';
      case 'rejected':
        return 'error';
      case 'inspection':
      case 'settlementReview':
        return 'info';
      default:
        return 'warning';
    }
  };

  const lockedCases = applications.filter(
    (app) => app.caseLocked || app.status === 'approved' || app.status === 'confirmed'
  ).length;

  const inspectionQueue = applications.filter((app) => app.status === 'inspection').length;

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
            onClick={handleOpenForm}
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
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Locked Cases
                </Typography>
                <Typography variant="h4">
                  {lockedCases}
                </Typography>
              </Grid>
              <Grid item xs={6}>
                <Typography variant="body2" color="text.secondary">
                  Inspection Queue
                </Typography>
                <Typography variant="h4">
                  {inspectionQueue}
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
              <>
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
                      <TableCell>Documents</TableCell>
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
                            icon={<PdfIcon fontSize="small" />}
                            label={`${application.documents.length} file${application.documents.length !== 1 ? 's' : ''}`}
                            size="small"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell>
                          <Chip
                            label={application.status}
                            color={getStatusColor(application.status)}
                            size="small"
                            sx={{ textTransform: 'capitalize' }}
                          />
                        </TableCell>
                        <TableCell>
                          {(() => {
                            const locked =
                              application.caseLocked ||
                              application.status === 'approved' ||
                              application.status === 'confirmed';
                            const reason =
                              application.reasonLocked ||
                              (application.status === 'confirmed'
                                ? 'Application has been confirmed and is read-only.'
                                : application.status === 'approved'
                                ? 'Application has been approved.'
                                : 'Actions available');
                            const actionButtons = (
                              <>
                                <IconButton
                                  size="small"
                                  disabled={locked}
                                  onClick={() => {
                                    /* Handle view */
                                  }}
                                >
                                  <ViewIcon />
                                </IconButton>
                                <IconButton
                                  size="small"
                                  disabled={locked}
                                  onClick={() => {
                                    /* Handle edit */
                                  }}
                                >
                                  <EditIcon />
                                </IconButton>
                              </>
                            );
                            return locked ? (
                              <Tooltip title={reason}>{actionButtons}</Tooltip>
                            ) : (
                              actionButtons
                            );
                          })()}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                  </Table>
                </TableContainer>
                <Accordion defaultExpanded>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="subtitle1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <DescriptionIcon fontSize="small" /> Application Details
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Grid container spacing={2}>
                    {applications.map((application) => (
                      <Grid item xs={12} md={6} key={`${application.id}-details`}>
                        <Paper variant="outlined" sx={{ p: 2, height: '100%' }}>
                          <Stack spacing={1.5}>
                            <Stack spacing={0.5}>
                              <Typography variant="subtitle2">{application.applicationNumber}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                Applicant: {application.applicantName}
                              </Typography>
                              {application.caseLocked && (
                                <Chip
                                  label="Locked"
                                  color="success"
                                  size="small"
                                  sx={{ width: 'fit-content' }}
                                />
                              )}
                            </Stack>

                            <Divider />
                            <Typography variant="body2" fontWeight={600}>
                              Documents
                            </Typography>
                            <Stack spacing={0.5}>
                              {application.documents.map((doc) => (
                                <Chip
                                  key={doc.id}
                                  icon={<PdfIcon fontSize="small" />}
                                  label={doc.fileName}
                                  size="small"
                                  variant="outlined"
                                />
                              ))}
                            </Stack>

                            <Divider />
                            <Typography variant="body2" fontWeight={600}>
                              Inspection Reports
                            </Typography>
                            <Stack spacing={1}>
                              {application.inspectionReports.map((report) => (
                                <Paper key={report.id} variant="outlined" sx={{ p: 1.5 }}>
                                  <Stack spacing={0.5}>
                                    <Typography variant="body2">
                                      {format(report.inspectionDate, 'MMM d, yyyy')} · {report.inspector}
                                    </Typography>
                                    <Chip
                                      label={report.status}
                                      size="small"
                                      color={
                                        report.status === 'passed'
                                          ? 'success'
                                          : report.status === 'failed'
                                          ? 'error'
                                          : 'warning'
                                      }
                                      sx={{ width: 'fit-content', textTransform: 'capitalize' }}
                                    />
                                    {report.comments && (
                                      <Typography variant="caption">{report.comments}</Typography>
                                    )}
                                  </Stack>
                                </Paper>
                              ))}
                            </Stack>

                            <Divider />
                            <Typography variant="body2" fontWeight={600}>
                              Settlement
                            </Typography>
                            <Stack spacing={0.5}>
                              <Typography variant="body2">
                                {application.settlementRecord.settlementArea} ·{' '}
                                {application.settlementRecord.plotReference ?? 'Unassigned plot'}
                              </Typography>
                              <Stack direction="row" spacing={1}>
                                <Chip
                                  icon={<LocationOnIcon fontSize="small" />}
                                  label={`Water: ${application.settlementRecord.accessToUtilities.water ? 'Yes' : 'No'}`}
                                  size="small"
                                  variant="outlined"
                                />
                                <Chip
                                  icon={<LocationOnIcon fontSize="small" />}
                                  label={`Electricity: ${application.settlementRecord.accessToUtilities.electricity ? 'Yes' : 'No'}`}
                                  size="small"
                                  variant="outlined"
                                />
                                <Chip
                                  icon={<LocationOnIcon fontSize="small" />}
                                  label={`Sanitation: ${application.settlementRecord.accessToUtilities.sanitation ? 'Yes' : 'No'}`}
                                  size="small"
                                  variant="outlined"
                                />
                              </Stack>
                            </Stack>

                            <Divider />
                            <Typography variant="body2" fontWeight={600}>
                              Household
                            </Typography>
                            <Stack spacing={0.5}>
                              <Typography variant="body2">
                                Head: {application.householdRecord.headOfHousehold}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                Contact: {application.householdRecord.contactNumber || 'N/A'}
                              </Typography>
                              <Stack spacing={0.5}>
                                {application.householdRecord.members.map((member) => (
                                  <Chip
                                    key={member.id}
                                    icon={<PeopleIcon fontSize="small" />}
                                    label={`${member.name} · ${member.relationship} (${member.age})${
                                      member.employed ? ' · employed' : ''
                                    }`}
                                    size="small"
                                    variant="outlined"
                                  />
                                ))}
                              </Stack>
                            </Stack>
                          </Stack>
                        </Paper>
                      </Grid>
                    ))}
                  </Grid>
                </AccordionDetails>
                </Accordion>
              </>
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

      <Dialog open={openForm} onClose={handleCloseForm} fullWidth maxWidth="md">
        <DialogTitle>New Ownership Application</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Stack spacing={2}>
              <Typography variant="subtitle1">Applicant Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Applicant Name"
                    value={formState.applicantName}
                    onChange={handleFieldChange('applicantName')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    label="Property Type"
                    value={formState.propertyType}
                    onChange={handleFieldChange('propertyType')}
                    fullWidth
                  >
                    <MenuItem value="house">House</MenuItem>
                    <MenuItem value="apartment">Apartment</MenuItem>
                    <MenuItem value="land">Land</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Monthly Income (ZMW)"
                    value={formState.monthlyIncome}
                    onChange={handleFieldChange('monthlyIncome')}
                    type="number"
                    inputProps={{ min: 0 }}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Settlement Area"
                    value={formState.settlementArea}
                    onChange={handleFieldChange('settlementArea')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Plot Reference (optional)"
                    value={formState.plotReference}
                    onChange={handleFieldChange('plotReference')}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle1">Documents</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Document Name"
                    value={formState.documentName}
                    onChange={handleFieldChange('documentName')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    select
                    label="Document Type"
                    value={formState.documentType}
                    onChange={handleFieldChange('documentType')}
                    fullWidth
                  >
                    <MenuItem value="identity">Identity</MenuItem>
                    <MenuItem value="proof_of_income">Proof of Income</MenuItem>
                    <MenuItem value="tenancy">Tenancy</MenuItem>
                    <MenuItem value="other">Other</MenuItem>
                  </TextField>
                </Grid>
                <Grid item xs={12} md={3}>
                  <Button variant="outlined" sx={{ height: '100%' }} onClick={handleAddDocument}>
                    Add Document
                  </Button>
                </Grid>
              </Grid>
              {documents.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Add at least one supporting document.
                </Typography>
              ) : (
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {documents.map((doc) => (
                    <Chip
                      key={doc.id}
                      icon={<PdfIcon fontSize="small" />}
                      label={`${doc.name} (${doc.type})`}
                      onDelete={() => handleRemoveDocument(doc.id)}
                      variant="outlined"
                    />
                  ))}
                </Stack>
              )}
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle1">Inspection Schedule</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Inspection Date"
                    type="date"
                    value={formState.inspectionDate}
                    onChange={handleFieldChange('inspectionDate')}
                    InputLabelProps={{ shrink: true }}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Inspector"
                    value={formState.inspector}
                    onChange={handleFieldChange('inspector')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Inspection Notes"
                    value={formState.inspectionComments}
                    onChange={handleFieldChange('inspectionComments')}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle1">Settlement Coordinates & Utilities</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Latitude"
                    value={formState.latitude}
                    onChange={handleFieldChange('latitude')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Longitude"
                    value={formState.longitude}
                    onChange={handleFieldChange('longitude')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <Stack direction="row" spacing={1}>
                    <FormControlLabel
                      control={
                        <Checkbox checked={formState.accessWater} onChange={handleFieldChange('accessWater')} />
                      }
                      label="Water"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formState.accessElectricity}
                          onChange={handleFieldChange('accessElectricity')}
                        />
                      }
                      label="Electricity"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={formState.accessSanitation}
                          onChange={handleFieldChange('accessSanitation')}
                        />
                      }
                      label="Sanitation"
                    />
                  </Stack>
                </Grid>
              </Grid>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle1">Household Records</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Head of Household"
                    value={formState.headOfHousehold}
                    onChange={handleFieldChange('headOfHousehold')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Contact Number"
                    value={formState.contactNumber}
                    onChange={handleFieldChange('contactNumber')}
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Typography variant="subtitle2">Add Household Member</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Name"
                    value={formState.memberName}
                    onChange={handleFieldChange('memberName')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <TextField
                    label="Age"
                    type="number"
                    inputProps={{ min: 0 }}
                    value={formState.memberAge}
                    onChange={handleFieldChange('memberAge')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={3}>
                  <TextField
                    label="Relationship"
                    value={formState.memberRelationship}
                    onChange={handleFieldChange('memberRelationship')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <FormControlLabel
                    control={
                      <Checkbox checked={formState.memberEmployed} onChange={handleFieldChange('memberEmployed')} />
                    }
                    label="Employed"
                  />
                </Grid>
                <Grid item xs={12} md={2}>
                  <Button variant="outlined" sx={{ height: '100%' }} onClick={handleAddHouseholdMember}>
                    Add Member
                  </Button>
                </Grid>
              </Grid>
              {householdMembers.length === 0 ? (
                <Typography variant="body2" color="text.secondary">
                  Add at least one household member.
                </Typography>
              ) : (
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {householdMembers.map((member) => (
                    <Chip
                      key={member.id}
                      icon={<PeopleIcon fontSize="small" />}
                      label={`${member.name} (${member.relationship})`}
                      onDelete={() => handleRemoveMember(member.id)}
                      variant="outlined"
                    />
                  ))}
                </Stack>
              )}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button variant="contained" disabled={!canSubmit} onClick={handleCreateApplication}>
            Create Application
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
