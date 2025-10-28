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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
  Chip,
} from '@mui/material';
import {
  Add as AddIcon,
  Visibility as ViewIcon,
  Edit as EditIcon,
  UploadFile as UploadFileIcon,
  Image as ImageIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import { ChangeEvent, useMemo, useState } from 'react';
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
  const [openForm, setOpenForm] = useState(false);
  const [formValues, setFormValues] = useState({
    referenceNumber: '',
    meetingDate: '',
    agenda: '',
    decisions: '',
    approvals: 0,
    attachments: [] as File[],
  });

  const canSubmit = useMemo(() => {
    return (
      formValues.referenceNumber.trim() !== '' &&
      formValues.meetingDate.trim() !== '' &&
      formValues.agenda.trim() !== ''
    );
  }, [formValues]);

  const handleOpenForm = () => setOpenForm(true);

  const handleCloseForm = () => {
    setOpenForm(false);
    setFormValues({
      referenceNumber: '',
      meetingDate: '',
      agenda: '',
      decisions: '',
      approvals: 0,
      attachments: [],
    });
  };

  const handleChange =
    (field: 'referenceNumber' | 'meetingDate' | 'agenda' | 'decisions') =>
    (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setFormValues((prev) => ({ ...prev, [field]: event.target.value }));
    };

  const handleApprovalsChange = (event: SelectChangeEvent) => {
    setFormValues((prev) => ({
      ...prev,
      approvals: Number(event.target.value),
    }));
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) {
      return;
    }

    const allowedExtensions = /\.(pdf|doc|docx|xls|xlsx|ppt|pptx|txt)$/i;
    const allowedMimeTypes = new Set([
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'application/vnd.ms-powerpoint',
      'application/vnd.openxmlformats-officedocument.presentationml.presentation',
      'text/plain',
    ]);

    const newFiles = Array.from(files).filter((file) => {
      if (file.type.startsWith('image/')) {
        return true;
      }
      if (allowedMimeTypes.has(file.type)) {
        return true;
      }
      return allowedExtensions.test(file.name);
    });

    if (newFiles.length > 0) {
      setFormValues((prev) => ({
        ...prev,
        attachments: [...prev.attachments, ...newFiles],
      }));
    }

    event.target.value = '';
  };

  const handleRemoveAttachment = (index: number) => {
    setFormValues((prev) => ({
      ...prev,
      attachments: prev.attachments.filter((_, fileIndex) => fileIndex !== index),
    }));
  };

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Administration Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenForm}
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

      <Dialog open={openForm} onClose={handleCloseForm} maxWidth="sm" fullWidth>
        <DialogTitle>Record Minute Book Entry</DialogTitle>
        <DialogContent>
          <Stack spacing={2} sx={{ mt: 1 }}>
            <TextField
              label="Reference Number"
              value={formValues.referenceNumber}
              onChange={handleChange('referenceNumber')}
              required
              fullWidth
            />
            <TextField
              label="Meeting Date"
              type="date"
              value={formValues.meetingDate}
              onChange={handleChange('meetingDate')}
              required
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
            <TextField
              label="Agenda"
              value={formValues.agenda}
              onChange={handleChange('agenda')}
              required
              multiline
              minRows={2}
              fullWidth
            />
            <TextField
              label="Key Decisions"
              value={formValues.decisions}
              onChange={handleChange('decisions')}
              multiline
              minRows={2}
              fullWidth
            />
            <FormControl fullWidth>
              <InputLabel id="approvals-label">Leasehold Approvals</InputLabel>
              <Select
                labelId="approvals-label"
                label="Leasehold Approvals"
                value={formValues.approvals}
                onChange={handleApprovalsChange}
              >
                {[0, 1, 2, 3, 4, 5].map((count) => (
                  <MenuItem key={count} value={count}>
                    {count === 0 ? 'None' : `${count} approval${count > 1 ? 's' : ''}`}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Stack spacing={1}>
              <Button
                variant="outlined"
                startIcon={<UploadFileIcon />}
                component="label"
              >
                Upload Attachments
                <input
                  hidden
                  type="file"
                  multiple
                  accept="image/*,.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx,.txt"
                  onChange={handleFileUpload}
                />
              </Button>
              {formValues.attachments.length > 0 ? (
                <Stack direction="row" spacing={1} useFlexGap flexWrap="wrap">
                  {formValues.attachments.map((file, index) => {
                    const isImage = file.type.startsWith('image/');
                    const sizeKb = file.size / 1024;
                    return (
                      <Chip
                        key={`${file.name}-${index}`}
                        icon={isImage ? <ImageIcon fontSize="small" /> : <FileIcon fontSize="small" />}
                        label={`${file.name} (${sizeKb >= 1024 ? `${(sizeKb / 1024).toFixed(1)} MB` : `${sizeKb.toFixed(1)} KB`})`}
                        onDelete={() => handleRemoveAttachment(index)}
                        sx={{ maxWidth: 240 }}
                      />
                    );
                  })}
                </Stack>
              ) : (
                <Typography variant="caption" color="text.secondary">
                  No attachments added yet.
                </Typography>
              )}
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleCloseForm}>Cancel</Button>
          <Button
            variant="contained"
            disabled={!canSubmit}
            onClick={() => {
              /* placeholder submit handler */
              handleCloseForm();
            }}
          >
            Save Minutes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
