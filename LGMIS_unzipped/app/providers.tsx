"use client";

import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { Provider as ReduxProvider } from "react-redux";
import { store } from "@/redux/store";
import { SessionProvider } from "next-auth/react";

const theme = createTheme({
  palette: { mode: "light", primary: { main: "#1976d2" } }
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <ReduxProvider store={store}>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </ReduxProvider>
    </SessionProvider>
  );
}
