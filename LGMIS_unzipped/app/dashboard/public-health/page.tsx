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
  Chip,
  Stack,
  Button,
  IconButton,
} from '@mui/material';
import {
  AssignmentTurnedIn as CertificateIcon,
  LocalHospital as MedicalIcon,
  CalendarMonth as CalendarIcon,
  Badge as BadgeIcon,
  Description as DescriptionIcon,
  Pets as PetsIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { useMemo, useState } from 'react';
import { addMonths, endOfYear, format, isBefore } from 'date-fns';

type CertificateStatus = 'pending' | 'issued' | 'expired';
type BurialStatus = 'pending' | 'authorised' | 'audited';
type DogStatus = 'active' | 'lapsed' | 'revoked';

interface MedicalFitnessCertificate {
  certificateNumber: string;
  applicantType: 'individual' | 'business';
  applicantName: string;
  examinationDate: Date;
  issueDate?: Date;
  expiryDate?: Date;
  status: CertificateStatus;
}

interface BurialDisposalPermit {
  permitNumber: string;
  receiptNumber: string;
  issueDate: Date;
  deceasedName: string;
  dateOfDeath: Date;
  cemetery: string;
  graveNumber: string;
  authorisingOfficer: string;
  status: BurialStatus;
}

interface DogRegistration {
  applicationNumber: string;
  tagNumber: string;
  ownerName: string;
  ownerAddress: string;
  dogName: string;
  breed: string;
  colour: string;
  vaccinatedOn: Date;
  licenceExpiry: Date;
  status: DogStatus;
}

const mockCertificates: MedicalFitnessCertificate[] = [
  {
    certificateNumber: 'MED-2025-045',
    applicantType: 'business',
    applicantName: 'Greenfield Foods Ltd',
    examinationDate: new Date('2025-04-01'),
    issueDate: new Date('2025-04-03'),
    expiryDate: addMonths(new Date('2025-04-03'), 6),
    status: 'issued',
  },
  {
    certificateNumber: 'MED-2025-052',
    applicantType: 'individual',
    applicantName: 'Chanda M.',
    examinationDate: new Date('2025-04-15'),
    status: 'pending',
  },
];

const mockPermits: BurialDisposalPermit[] = [
  {
    permitNumber: 'BUR-2025-110',
    receiptNumber: 'RCP-99321',
    issueDate: new Date('2025-04-10'),
    deceasedName: 'Mwila L.',
    dateOfDeath: new Date('2025-04-09'),
    cemetery: 'Chingwere Cemetery',
    graveNumber: 'Plot 45B',
    authorisingOfficer: 'Officer L. Banda',
    status: 'audited',
  },
  {
    permitNumber: 'BUR-2025-118',
    receiptNumber: 'RCP-99390',
    issueDate: new Date('2025-04-22'),
    deceasedName: 'Josephine M.',
    dateOfDeath: new Date('2025-04-20'),
    cemetery: 'Independence Cemetery',
    graveNumber: 'Section D-12',
    authorisingOfficer: 'Officer R. Tembo',
    status: 'pending',
  },
];

const mockDogRegistrations: DogRegistration[] = [
  {
    applicationNumber: 'DOG-2025-001',
    tagNumber: 'TAG-8821',
    ownerName: 'Natasha Phiri',
    ownerAddress: 'Plot 12, Kabulonga',
    dogName: 'Simba',
    breed: 'German Shepherd',
    colour: 'Black & Tan',
    vaccinatedOn: new Date('2025-01-05'),
    licenceExpiry: endOfYear(new Date('2025-01-05')),
    status: 'active',
  },
  {
    applicationNumber: 'DOG-2025-008',
    tagNumber: 'TAG-8836',
    ownerName: 'Kalala & Co.',
    ownerAddress: 'Stand 45, Northmead',
    dogName: 'Bella',
    breed: 'Beagle',
    colour: 'Tricolour',
    vaccinatedOn: new Date('2024-02-14'),
    licenceExpiry: endOfYear(new Date('2024-02-14')),
    status: isBefore(endOfYear(new Date('2024-02-14')), new Date()) ? 'lapsed' : 'active',
  },
];

export default function PublicHealthDashboard() {
  const [certificates] = useState(mockCertificates);
  const [burialPermits] = useState(mockPermits);
  const [dogRegistrations] = useState(mockDogRegistrations);

  const certificateInsights = useMemo(() => {
    const issued = certificates.filter((cert) => cert.status === 'issued').length;
    const pending = certificates.filter((cert) => cert.status === 'pending').length;
    return { issued, pending, total: certificates.length };
  }, [certificates]);

  const permitInsights = useMemo(() => {
    const audited = burialPermits.filter((permit) => permit.status === 'audited').length;
    return { audited, total: burialPermits.length };
  }, [burialPermits]);

  const dogInsights = useMemo(() => {
    const active = dogRegistrations.filter((reg) => reg.status === 'active').length;
    const lapsed = dogRegistrations.filter((reg) => reg.status === 'lapsed').length;
    return { active, lapsed, total: dogRegistrations.length };
  }, [dogRegistrations]);

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Public Health Registry
        </Typography>
        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<CertificateIcon />}
            onClick={() => {
              /* handle new certificate */
            }}
          >
            New Certificate
          </Button>
          <Button
            variant="outlined"
            startIcon={<DescriptionIcon />}
            onClick={() => {
              /* handle new permit */
            }}
          >
            Burial Permit
          </Button>
          <Button
            variant="outlined"
            startIcon={<PetsIcon />}
            onClick={() => {
              /* handle new dog registration */
            }}
          >
            Dog Registration
          </Button>
        </Stack>
      </Box>

      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <MedicalIcon color="primary" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Medical Fitness Certificates
                </Typography>
                <Typography variant="h5">{certificateInsights.total}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {certificateInsights.issued} issued · {certificateInsights.pending} pending
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <HistoryIcon color="secondary" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Burial Disposal Permits
                </Typography>
                <Typography variant="h5">{permitInsights.total}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {permitInsights.audited} audited records
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3 }}>
            <Stack direction="row" spacing={2} alignItems="center">
              <BadgeIcon color="success" />
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  Dog Registrations
                </Typography>
                <Typography variant="h5">{dogInsights.total}</Typography>
                <Typography variant="caption" color="text.secondary">
                  {dogInsights.active} active · {dogInsights.lapsed} lapsed
                </Typography>
              </Box>
            </Stack>
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Medical Fitness Certificates
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Certificate #</TableCell>
                    <TableCell>Applicant</TableCell>
                    <TableCell>Exam Date</TableCell>
                    <TableCell>Issued</TableCell>
                    <TableCell>Expiry</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {certificates.map((certificate) => (
                    <TableRow key={certificate.certificateNumber}>
                      <TableCell>{certificate.certificateNumber}</TableCell>
                      <TableCell>
                        <Stack spacing={0.5}>
                          <Typography variant="body2">{certificate.applicantName}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {certificate.applicantType === 'business' ? 'Business' : 'Individual'}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{format(certificate.examinationDate, 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        {certificate.issueDate ? format(certificate.issueDate, 'MMM d, yyyy') : '—'}
                      </TableCell>
                      <TableCell>
                        {certificate.expiryDate ? format(certificate.expiryDate, 'MMM d, yyyy') : '—'}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={certificate.status}
                          size="small"
                          color={
                            certificate.status === 'issued'
                              ? 'success'
                              : certificate.status === 'pending'
                              ? 'warning'
                              : 'default'
                          }
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <ViewIcon />
                        </IconButton>
                        <IconButton size="small">
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

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Burial Disposal Permits
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Permit #</TableCell>
                    <TableCell>Receipt #</TableCell>
                    <TableCell>Deceased</TableCell>
                    <TableCell>Dates</TableCell>
                    <TableCell>Cemetery</TableCell>
                    <TableCell>Authorised By</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {burialPermits.map((permit) => (
                    <TableRow key={permit.permitNumber}>
                      <TableCell>{permit.permitNumber}</TableCell>
                      <TableCell>{permit.receiptNumber}</TableCell>
                      <TableCell>
                        <Stack spacing={0.5}>
                          <Typography variant="body2">{permit.deceasedName}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            DOD: {format(permit.dateOfDeath, 'MMM d, yyyy')}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>
                        Issue: {format(permit.issueDate, 'MMM d, yyyy')}
                      </TableCell>
                      <TableCell>
                        <Stack spacing={0.5}>
                          <Typography variant="body2">{permit.cemetery}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            Grave: {permit.graveNumber}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{permit.authorisingOfficer}</TableCell>
                      <TableCell>
                        <Chip
                          label={permit.status}
                          size="small"
                          color={
                            permit.status === 'audited'
                              ? 'success'
                              : permit.status === 'authorised'
                              ? 'info'
                              : 'warning'
                          }
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <ViewIcon />
                        </IconButton>
                        <IconButton size="small">
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small">
                          <HistoryIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Paper>
        </Grid>

        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Dog Registrations
            </Typography>
            <TableContainer>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Application #</TableCell>
                    <TableCell>Tag #</TableCell>
                    <TableCell>Owner</TableCell>
                    <TableCell>Dog Details</TableCell>
                    <TableCell>Vaccinated</TableCell>
                    <TableCell>Licence Expiry</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {dogRegistrations.map((registration) => (
                    <TableRow key={registration.applicationNumber}>
                      <TableCell>{registration.applicationNumber}</TableCell>
                      <TableCell>{registration.tagNumber}</TableCell>
                      <TableCell>
                        <Typography variant="body2">{registration.ownerName}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {registration.ownerAddress}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Stack spacing={0.5}>
                          <Typography variant="body2">{registration.dogName}</Typography>
                          <Typography variant="caption" color="text.secondary">
                            {registration.breed} · {registration.colour}
                          </Typography>
                        </Stack>
                      </TableCell>
                      <TableCell>{format(registration.vaccinatedOn, 'MMM d, yyyy')}</TableCell>
                      <TableCell>{format(registration.licenceExpiry, 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <Chip
                          label={registration.status}
                          size="small"
                          color={
                            registration.status === 'active'
                              ? 'success'
                              : registration.status === 'lapsed'
                              ? 'warning'
                              : 'error'
                          }
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>
                        <IconButton size="small">
                          <ViewIcon />
                        </IconButton>
                        <IconButton size="small">
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
