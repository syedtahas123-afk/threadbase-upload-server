# Threadbase Upload Server

Express API for authenticated avatar uploads using Multer.

## Requirements

- Node.js 18+
- npm

## Setup

```bash
npm install
npm start
```

The server listens on `PORT` (default `3000`).

## Authentication

For local testing, sign in with the demo credentials `ada` / `password` using `POST /api/login` with JSON `{ "username": "ada", "password": "password" }`. Use the returned bearer token for protected routes.

## Upload an avatar

Send `POST /api/upload` with `Authorization: Bearer <token>` and `multipart/form-data` field `avatar`. Supported formats: JPEG, PNG, WebP, and GIF. Maximum size: 5 MB.

A successful response returns a URL such as `/uploads/<filename>`. Open that URL on the server host to view the uploaded image.

## Error cases

- `401`: missing or invalid token
- `400`: missing file, unsupported file type, or file too large

Uploaded files are stored in `uploads/` and served statically at `/uploads`.
