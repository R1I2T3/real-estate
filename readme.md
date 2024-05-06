# Restate a Real estate project

### Tech stack

- Hono.js: Backend Framework
- React Client Library
- Tanstack query for client side Data fetching and caching
- Prisma as an ORM
- Zod for validation

### Key features

- Infinite scroll
- offset Based Pagination
- Validation on both client and server side
- File Upload to cloudinary and used formdata for sending data to server

### Sample Env file

- DATABASE_UR=
- CLOUD_NAME=
- API_KEY=
- API_SECRET=
- JWT_SECRET=
- TEMP_IMAGE_PATH=

For setting project on local environment

```
cd server
bun i
cd ../client
bun i
```

For running project

```
cd client
bun run dev
cd server
bun run dev
```
