import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class FileEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  filename!: string;

  @Column()
  url!: string; // local path or S3 URL

  @CreateDateColumn()
  uploadedAt!: Date;
}
