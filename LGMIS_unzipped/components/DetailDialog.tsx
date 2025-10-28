import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  IconButton,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material';
import { ReactNode } from 'react';

interface DetailDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
  onSave?: () => void;
  saveText?: string;
  maxWidth?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  loading?: boolean;
  readOnly?: boolean;
}

export default function DetailDialog({
  open,
  onClose,
  title,
  children,
  onSave,
  saveText = 'Save',
  maxWidth = 'sm',
  loading = false,
  readOnly = false,
}: DetailDialogProps) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={fullScreen}
      maxWidth={maxWidth}
      fullWidth
    >
      <DialogTitle>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h6">{title}</Typography>
          <IconButton
            aria-label="close"
            onClick={onClose}
            size="small"
            sx={{ color: 'grey.500' }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
      </DialogTitle>

      <DialogContent dividers>
        {children}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} color="inherit">
          {readOnly ? 'Close' : 'Cancel'}
        </Button>
        {!readOnly && onSave && (
          <Button
            onClick={onSave}
            variant="contained"
            color="primary"
            disabled={loading}
          >
            {loading ? 'Saving...' : saveText}
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}