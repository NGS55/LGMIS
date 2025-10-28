import { NextRequest, NextResponse } from "next/server";
import { uploadToS3 } from "@/lib/s3";
import { getDataSource } from "@/lib/db";
import { FileEntity } from "@/entities/FileEntity";

export const runtime = "nodejs"; // required for formData + buffers in App Router

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file");
  if (!file || !(file instanceof File)) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  let url: string;

  if (process.env.NODE_ENV === "production") {
    const key = `uploads/${Date.now()}-${file.name}`;
    url = await uploadToS3(key, buffer, file.type);
  } else {
    // local save into /public/uploads
    const fs = await import("fs/promises");
    const path = `public/uploads/${Date.now()}-${file.name}`;
    await fs.mkdir("public/uploads", { recursive: true });
    await fs.writeFile(path, buffer);
    url = `/${path}`;
  }

  const ds = await getDataSource();
  const repo = ds.getRepository(FileEntity);
  const rec = new FileEntity();
  rec.filename = file.name;
  rec.url = url;
  await repo.save(rec);

  return NextResponse.json({ url });
}
