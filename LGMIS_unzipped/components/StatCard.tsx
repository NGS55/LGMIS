import { Box, Paper, Typography, SxProps, Theme } from '@mui/material';
import { ReactNode } from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  color?: string;
  sx?: SxProps<Theme>;
}

export function StatCard({ title, value, icon, color = 'primary.main', sx }: StatCardProps) {
  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        ...sx
      }}
    >
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        {icon && <Box sx={{ mr: 1, color }}>{icon}</Box>}
        <Typography variant="h6" component="h3">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" component="div" sx={{ color }}>
        {value}
      </Typography>
    </Paper>
  );
}