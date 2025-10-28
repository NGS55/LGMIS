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
  Button,
  IconButton,
} from '@mui/material';
import {
  Download as DownloadIcon,
  Visibility as ViewIcon,
  PictureAsPdf as PdfIcon,
  InsertDriveFile as FileIcon,
} from '@mui/icons-material';
import { useState } from 'react';
import { format } from 'date-fns';

type ReportCategory = 'finance' | 'valuation' | 'leasehold' | 'housing';

interface ReportRecord {
  id: string;
  title: string;
  category: ReportCategory;
  period: string;
  generatedOn: Date;
  status: 'draft' | 'published' | 'archived';
  format: 'pdf' | 'xlsx';
  sizeMb: number;
}

const mockReports: ReportRecord[] = [
  {
    id: 'RPT-2025-001',
    title: 'Q1 Property Rates Summary',
    category: 'finance',
    period: 'Q1 2025',
    generatedOn: new Date('2025-04-05'),
    status: 'published',
    format: 'pdf',
    sizeMb: 2.4,
  },
  {
    id: 'RPT-2025-014',
    title: 'Valuation Adjustments Overview',
    category: 'valuation',
    period: 'Mar 2025',
    generatedOn: new Date('2025-03-30'),
    status: 'draft',
    format: 'xlsx',
    sizeMb: 1.1,
  },
  {
    id: 'RPT-2025-020',
    title: 'Leasehold Renewals Pipeline',
    category: 'leasehold',
    period: 'Apr 2025',
    generatedOn: new Date('2025-04-18'),
    status: 'published',
    format: 'pdf',
    sizeMb: 3.6,
  },
];

const categoryLabels: Record<ReportCategory, string> = {
  finance: 'Finance',
  valuation: 'Valuation',
  leasehold: 'Leasehold',
  housing: 'Housing',
};

export default function ReportsDashboard() {
  const [reports] = useState<ReportRecord[]>(mockReports);

  return (
    <Box>
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h4" component="h1">
          Reports
        </Typography>
        <Box>
          <Button
            variant="outlined"
            startIcon={<DownloadIcon />}
            sx={{ mr: 2 }}
            onClick={() => {
              /* handle export */
            }}
          >
            Export Selected
          </Button>
          <Button
            variant="contained"
            startIcon={<FileIcon />}
            onClick={() => {
              /* handle generate report */
            }}
          >
            Generate Report
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
              Report Catalog
            </Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>ID</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Period</TableCell>
                    <TableCell>Generated</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Format</TableCell>
                    <TableCell>Size</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell>{report.id}</TableCell>
                      <TableCell>{report.title}</TableCell>
                      <TableCell>{categoryLabels[report.category]}</TableCell>
                      <TableCell>{report.period}</TableCell>
                      <TableCell>{format(report.generatedOn, 'MMM d, yyyy')}</TableCell>
                      <TableCell>
                        <Chip
                          label={report.status}
                          color={
                            report.status === 'published'
                              ? 'success'
                              : report.status === 'draft'
                              ? 'warning'
                              : 'default'
                          }
                          size="small"
                          sx={{ textTransform: 'capitalize' }}
                        />
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={report.format.toUpperCase()}
                          icon={report.format === 'pdf' ? <PdfIcon fontSize="small" /> : undefined}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>{report.sizeMb.toFixed(1)} MB</TableCell>
                      <TableCell>
                        <IconButton
                          size="small"
                          onClick={() => {
                            /* handle preview */
                          }}
                        >
                          <ViewIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={() => {
                            /* handle download */
                          }}
                        >
                          <DownloadIcon />
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
