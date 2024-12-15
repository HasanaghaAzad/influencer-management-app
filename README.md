# Influencer Management App

A straightforward application for managing a list of influencers, including their Instagram and TikTok accounts. Managers (app users) can be assigned/reassigned to specific influencers.

---

## Technologies Used  

- **Next.js**: Version 15.0.3 with App Router  
- **React**: Version 19  
- **Tailwind CSS** and **Tigrids** for styling  
- **Jose** for authentication  
- **TypeScript** 

--- 

## Seed Users

These test accounts are available for login:

| Email                        | Password   |
|------------------------------|------------|
| `nick.fury@shield.com`       | `invasion` |
| `odin.borson@asgard.com`     | `hela`     |

---

## Getting Started

### 1. Clone the Repository
```bash
git clone <repository-url>
cd <repository-folder>
```

### 2. Setup Environment Variables

Create a `.env` file:
```bash
cp .env.example .env
```

Set the following variables:
```env
POSTGRES_USER=
POSTGRES_PASSWORD=
POSTGRES_DB=
POSTGRES_PORT=

JWT_SECRET=
JWT_TOKEN_EXPIRES=7d
```

To generate a secure `JWT_SECRET`:
```bash
openssl rand -base64 32
```

For production, include:
```env
PROD_DATABASE_URL=
```

### 3. Install Dependencies and Run the App

Install required packages:
```bash
npm install
```

Start the development server:
```bash
npm run dev
```

The app will be accessible at:
[http://localhost:3000](http://localhost:3000)

---

## API Overview

### Authentication

**Login**
Send a `POST` request to `/api/login` with the following JSON body:
```json
{
    "email": "YOUR_EMAIL",
    "password": "YOUR_PASSWORD"
}
```
A successful response includes a token:
```json
{
    "token": "YOUR_TOKEN"
}
```

**Test Authentication**
Use the token to access secure endpoints, like:
```
GET /api/influencers
```

### Influencer Management

**Get All Influencers**
```
GET: /api/influencers
```

**Filter by Influencer Name**
```
GET: /api/influencers?influencerName=NAME
```

**Filter by Manager**
```
GET: /api/influencers?managerName=NAME
```

**Combine Filters**
```
GET: /api/influencers?influencerName=NAME&managerName=NAME
```

---

## Screenshots

![Screenshot 1](screenshots/screenshot1.png)
![Screenshot 2](screenshots/screenshot2.png)
![Screenshot 3](screenshots/screenshot3.png)
