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
  InputAdornment,
  Alert,
  FormControlLabel,
  Switch,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  Business as BusinessIcon,
  LocalBar as LiquorIcon,
  Refresh as RenewIcon,
} from '@mui/icons-material';
import { ChangeEvent, useMemo, useState } from 'react';
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

const DEFAULT_LICENSE_TYPES: LicenseType[] = ['business', 'liquor', 'trading', 'special'];

export default function LicensingDashboard() {
  const [licenses] = useState<License[]>(mockLicenses);
  const [activeTab, setActiveTab] = useState<LicenseType>('business');
  const [licenseTypes, setLicenseTypes] = useState<LicenseType[]>(DEFAULT_LICENSE_TYPES);
  const [openForm, setOpenForm] = useState(false);
  const [showTypeField, setShowTypeField] = useState(false);
  const [selectedType, setSelectedType] = useState<LicenseType | ''>('business');
  const [customType, setCustomType] = useState('');
  const [formValues, setFormValues] = useState({
    businessName: '',
    tradingName: '',
    registrationNumber: '',
    contactPerson: '',
    email: '',
    phone: '',
    validFrom: '',
    validUntil: '',
    initialFee: '',
  });

  const isCustomTypeValid = useMemo(() => {
    if (!showTypeField) return true;
    return customType.trim().length >= 3;
  }, [showTypeField, customType]);

  const canSubmit = useMemo(() => {
    const baseFilled =
      formValues.businessName.trim() &&
      formValues.tradingName.trim() &&
      formValues.registrationNumber.trim() &&
      formValues.email.trim() &&
      formValues.validFrom &&
      formValues.validUntil &&
      selectedType !== '';

    if (!baseFilled) {
      return false;
    }

    if (showTypeField && !isCustomTypeValid) {
      return false;
    }

    if (showTypeField && !licenseTypes.includes(customType.trim().toLowerCase() as LicenseType)) {
      return customType.trim().length >= 3;
    }

    return true;
  }, [formValues, selectedType, showTypeField, customType, isCustomTypeValid, licenseTypes]);

  const handleTabChange = (event: React.SyntheticEvent, newValue: LicenseType) => {
    setActiveTab(newValue);
  };

  const handleOpenForm = () => {
    setOpenForm(true);
  };

  const handleCloseForm = () => {
    setOpenForm(false);
    setShowTypeField(false);
    setCustomType('');
    setSelectedType('business');
    setFormValues({
      businessName: '',
      tradingName: '',
      registrationNumber: '',
      contactPerson: '',
      email: '',
      phone: '',
      validFrom: '',
      validUntil: '',
      initialFee: '',
    });
  };

  const handleFormChange =
    (field: keyof typeof formValues) =>
    (event: ChangeEvent<HTMLInputElement>) => {
      setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleLicenseTypeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value as LicenseType | 'new';
    if (value === 'new') {
      setShowTypeField(true);
      setSelectedType('');
      return;
    }
    setShowTypeField(false);
    setSelectedType(value);
  };

  const handleAddCustomType = () => {
    const sanitized = customType.trim().toLowerCase() as LicenseType;
    if (sanitized && !licenseTypes.includes(sanitized)) {
      setLicenseTypes((prev) => [...prev, sanitized]);
      setSelectedType(sanitized);
      setShowTypeField(false);
      setCustomType('');
    }
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
            onClick={handleOpenForm}
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

      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="md" fullWidth>
        <DialogTitle>Register New License</DialogTitle>
        <DialogContent>
          <Stack spacing={3} sx={{ mt: 1 }}>
            <Stack spacing={1.5}>
              <Typography variant="subtitle1">License Type</Typography>
              <Stack direction="row" spacing={2} alignItems="center">
                <TextField
                  select
                  label="Select Type"
                  value={showTypeField ? 'new' : selectedType}
                  onChange={handleLicenseTypeChange}
                  sx={{ minWidth: 220 }}
                >
                  {licenseTypes.map((type) => (
                    <MenuItem key={type} value={type}>
                      {type.charAt(0).toUpperCase() + type.slice(1)}
                    </MenuItem>
                  ))}
                  <MenuItem value="new">+ Add new license type</MenuItem>
                </TextField>
                <FormControlLabel
                  control={
                    <Switch
                      checked={showTypeField}
                      onChange={(_, checked) => setShowTypeField(checked)}
                    />
                  }
                  label="Create custom type"
                />
              </Stack>
              {showTypeField && (
                <Stack direction="row" spacing={2} alignItems="center">
                  <TextField
                    label="New License Type"
                    value={customType}
                    onChange={(event) => setCustomType(event.target.value)}
                    helperText="Provide a unique type name (min 3 characters)."
                  />
                  <Button
                    variant="outlined"
                    onClick={handleAddCustomType}
                    disabled={!isCustomTypeValid}
                  >
                    Add Type
                  </Button>
                </Stack>
              )}
              {showTypeField && !isCustomTypeValid && (
                <Alert severity="warning" sx={{ maxWidth: 360 }}>
                  Type name must be at least 3 characters long.
                </Alert>
              )}
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle1">Business Details</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Registered Business Name"
                    value={formValues.businessName}
                    onChange={handleFormChange('businessName')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Trading Name"
                    value={formValues.tradingName}
                    onChange={handleFormChange('tradingName')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Registration Number"
                    value={formValues.registrationNumber}
                    onChange={handleFormChange('registrationNumber')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Contact Person"
                    value={formValues.contactPerson}
                    onChange={handleFormChange('contactPerson')}
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Email"
                    type="email"
                    value={formValues.email}
                    onChange={handleFormChange('email')}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    label="Phone Number"
                    value={formValues.phone}
                    onChange={handleFormChange('phone')}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Stack>

            <Stack spacing={2}>
              <Typography variant="subtitle1">Validity and Fees</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Valid From"
                    type="date"
                    value={formValues.validFrom}
                    onChange={handleFormChange('validFrom')}
                    InputLabelProps={{ shrink: true }}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Valid Until"
                    type="date"
                    value={formValues.validUntil}
                    onChange={handleFormChange('validUntil')}
                    InputLabelProps={{ shrink: true }}
                    required
                    fullWidth
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    label="Initial Fee"
                    value={formValues.initialFee}
                    onChange={handleFormChange('initialFee')}
                    InputProps={{
                      startAdornment: <InputAdornment position="start">ZMW</InputAdornment>,
                      inputMode: 'decimal',
                    }}
                    fullWidth
                  />
                </Grid>
              </Grid>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!canSubmit}
            onClick={() => {
              /* submit coming soon */
              handleCloseForm();
            }}
          >
            Create License
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
