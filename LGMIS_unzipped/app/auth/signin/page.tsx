"use client";

import { Box, Button, Container, Stack, TextField, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { useState } from "react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Container sx={{ py: 8 }}>
      <Typography variant="h5" gutterBottom>Sign In</Typography>
      <Stack spacing={2} sx={{ maxWidth: 360 }}>
        <TextField label="Email" value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Password" type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <Box>
          <Button variant="contained" onClick={() => signIn("credentials", { email, password, callbackUrl: "/" })}>
            Sign In
          </Button>
        </Box>
      </Stack>
    </Container>
  );
}
