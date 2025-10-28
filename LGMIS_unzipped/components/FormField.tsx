import {
  TextField,
  TextFieldProps,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
  Box,
  Typography,
  Checkbox,
  FormControlLabel,
  RadioGroup,
  Radio,
  FormGroup,
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { ReactNode } from 'react';

export type FieldType =
  | 'text'
  | 'number'
  | 'email'
  | 'password'
  | 'select'
  | 'multiselect'
  | 'date'
  | 'checkbox'
  | 'radio'
  | 'textarea';

export interface Option {
  value: string | number;
  label: string;
}

interface FormFieldProps {
  type: FieldType;
  options?: Option[];
  error?: boolean;
  helperText?: string;
  value: any;
  onChange: (value: any) => void;
  label: string;
  fullWidth?: boolean;
  required?: boolean;
  disabled?: boolean;
  placeholder?: string;
  minRows?: number;
  maxRows?: number;
}

export default function FormField({
  type,
  options = [],
  error,
  helperText,
  value,
  onChange,
  label,
  fullWidth = true,
  required = false,
  disabled = false,
  placeholder,
  minRows = 3,
  maxRows = 5,
  ...props
}: FormFieldProps) {
  const handleChange = (event: any) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChange(event.target.checked);
  };

  const handleDateChange = (date: Date | null) => {
    onChange(date);
  };

  const renderField = (): ReactNode => {
    switch (type) {
      case 'select':
      case 'multiselect':
        return (
          <FormControl fullWidth={fullWidth} error={error} required={required}>
            <InputLabel>{label}</InputLabel>
            <Select
              value={value || (type === 'multiselect' ? [] : '')}
              onChange={handleChange}
              label={label}
              disabled={disabled}
              multiple={type === 'multiselect'}
              {...props}
            >
              {options.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );

      case 'date':
        return (
          <DatePicker
            label={label}
            value={value}
            onChange={handleDateChange}
            slotProps={{
              textField: {
                fullWidth,
                required,
                error,
                helperText,
                disabled,
              },
            }}
          />
        );

      case 'checkbox':
        return (
          <FormControl
            fullWidth={fullWidth}
            error={error}
            required={required}
            disabled={disabled}
          >
            <FormControlLabel
              control={
                <Checkbox
                  checked={Boolean(value)}
                  onChange={handleCheckboxChange}
                />
              }
              label={label}
            />
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );

      case 'radio':
        return (
          <FormControl
            fullWidth={fullWidth}
            error={error}
            required={required}
            disabled={disabled}
          >
            <Typography component="label" variant="body2" color="textSecondary">
              {label}
            </Typography>
            <RadioGroup value={value || ''} onChange={handleChange}>
              {options.map((option) => (
                <FormControlLabel
                  key={option.value}
                  value={option.value}
                  control={<Radio />}
                  label={option.label}
                />
              ))}
            </RadioGroup>
            {helperText && <FormHelperText>{helperText}</FormHelperText>}
          </FormControl>
        );

      case 'textarea':
        return (
          <TextField
            multiline
            minRows={minRows}
            maxRows={maxRows}
            value={value || ''}
            onChange={handleChange}
            label={label}
            error={error}
            helperText={helperText}
            fullWidth={fullWidth}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            {...props}
          />
        );

      default:
        return (
          <TextField
            type={type}
            value={value || ''}
            onChange={handleChange}
            label={label}
            error={error}
            helperText={helperText}
            fullWidth={fullWidth}
            required={required}
            disabled={disabled}
            placeholder={placeholder}
            {...props}
          />
        );
    }
  };

  return <Box sx={{ mb: 2 }}>{renderField()}</Box>;
}