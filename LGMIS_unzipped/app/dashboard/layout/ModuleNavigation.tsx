"use client";

import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import {
  AdminPanelSettings,
  Engineering,
  AccountBalance,
  Home,
  Gavel,
  Business,
  LocationCity,
  Assessment,
  CurrencyExchange,
  Book,
} from '@mui/icons-material';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const modules = [
  { name: 'Administration', icon: AdminPanelSettings, path: '/dashboard/administration' },
  { name: 'User Management', icon: AdminPanelSettings, path: '/dashboard/users' },
  { name: 'Engineering', icon: Engineering, path: '/dashboard/engineering' },
  { name: 'Finance', icon: AccountBalance, path: '/dashboard/finance' },
  { name: 'Housing', icon: Home, path: '/dashboard/housing' },
  { name: 'Leasehold Tenure', icon: LocationCity, path: '/dashboard/leasehold' },
  { name: 'Legal', icon: Gavel, path: '/dashboard/legal' },
  { name: 'Licensing', icon: Business, path: '/dashboard/licensing' },
  { name: 'Planning', icon: LocationCity, path: '/dashboard/planning' },
  { name: 'Valuation Role', icon: Assessment, path: '/dashboard/valuation' },
  { name: 'Property Rates', icon: CurrencyExchange, path: '/dashboard/property-rates' },
  { name: 'Reports', icon: Book, path: '/dashboard/reports' },
];

type ModuleNavigationProps = {
  onNavigate?: () => void;
};

function ModuleNavigation({ onNavigate }: ModuleNavigationProps) {
  const pathname = usePathname();

  return (
    <Box sx={{ mt: 2 }}>
      <Box sx={{ px: 2, mb: 2 }}>
        <Typography variant="h6" component="div">
          LGMIS Modules
        </Typography>
      </Box>
      <Divider />
      <List>
        {modules.map((module) => (
          <ListItemButton
            key={module.path}
            component={Link}
            href={module.path}
            selected={pathname === module.path}
            onClick={onNavigate}
          >
            <ListItemIcon>
              <module.icon />
            </ListItemIcon>
            <ListItemText primary={module.name} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );
}

export default ModuleNavigation;
export { ModuleNavigation };
