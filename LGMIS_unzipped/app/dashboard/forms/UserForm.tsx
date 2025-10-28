"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Box, Button, Stack, TextField } from "@mui/material";
import axios from "axios";

type FormValues = { name: string; email: string; password: string };

const schema = yup.object({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).required()
});

export default function UserForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm<FormValues>({
    resolver: yupResolver(schema)
  });

  async function onSubmit(values: FormValues) {
    await axios.post("/api/users", values);
    reset();
  }

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={2}>
        <TextField label="Name" {...register("name")} error={!!errors.name} helperText={errors.name?.message} />
        <TextField label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message} />
        <TextField label="Password" type="password" {...register("password")} error={!!errors.password} helperText={errors.password?.message} />
        <Button type="submit" disabled={isSubmitting} variant="contained">Create</Button>
      </Stack>
    </Box>
  );
}
