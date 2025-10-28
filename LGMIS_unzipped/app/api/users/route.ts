import { NextResponse } from "next/server";
import { getDataSource } from "@/lib/db";
import { User } from "@/entities/User";
import { hash } from "bcryptjs";

export async function GET() {
  const ds = await getDataSource();
  const repo = ds.getRepository(User);
  const users = await repo.find({ select: { id: true, name: true, email: true, createdAt: true } });
  return NextResponse.json(users);
}

export async function POST(req: Request) {
  const body = await req.json();
  const ds = await getDataSource();
  const repo = ds.getRepository(User);
  const user = new User();
  user.name = body.name;
  user.email = body.email;
  user.password = await hash(body.password, 10);
  await repo.save(user);
  return NextResponse.json({ ok: true, id: user.id }, { status: 201 });
}
