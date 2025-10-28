# Next.js 14 + MUI + TypeORM Starter

A monolithic Next.js App Router project featuring:
- NextAuth (JWT), TypeORM (MySQL), Multer uploads (dev) / S3 (prod)
- MUI with theming, Redux Toolkit, React Hook Form + Yup, Chart.js
- Jest + RTL + Supertest tests

## Quickstart

```bash
npm install
cp .env.example .env
npm run dev
```

### Database
Ensure MySQL 8.0+. In dev, TypeORM `synchronize` is enabled.

### Testing
```bash
npm test
```

### File storage
- Dev: `/public/uploads`
- Prod: AWS S3 (env-based switch)
