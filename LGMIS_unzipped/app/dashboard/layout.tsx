import type { ReactNode } from 'react';
import DashboardLayout from './layout/DashboardLayout';

export default function DashboardSectionLayout({ children }: { children: ReactNode }) {
  return <DashboardLayout>{children}</DashboardLayout>;
}
