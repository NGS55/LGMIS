import Link from "next/link";
import { Box, Button, Container, Typography } from "@mui/material";

export default function HomePage() {
  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h4" gutterBottom>Welcome</Typography>
      <Typography gutterBottom>
        This is a starter template using Next.js 14 App Router.
      </Typography>
      <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
        <Button component={Link} href="/dashboard" variant="contained">Dashboard</Button>
        <Button component={Link} href="/auth/signin" variant="outlined">Sign In</Button>
      </Box>
    </Container>
  );
}
