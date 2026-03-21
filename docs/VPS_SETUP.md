# VPS Project Setup & Deployment Guide

## Purpose
This document is a reusable setup guide for starting and deploying full-stack projects on a VPS. It covers planning, local setup, server architecture, deployment, rollback, backups, environment configuration, static file handling, and improvements for production safety.

---

## 1. Project Planning Before Coding
Before starting any project, decide these first:

- Project name
- Frontend domain
- Backend domain / API subdomain
- Live server IP
- Local ports
- Production ports
- Database type
- Image/file storage strategy
- Authentication method
- Mail service
- Backup strategy
- Rollback strategy
- Whether you need staging

### Recommended domain structure
- Frontend: `https://example.com`
- Backend API: `https://api.example.com`
- Admin panel: `https://admin.example.com` (optional)

### Recommended environment types
- Local
- Staging (optional but very useful)
- Production

---

## 2. Recommended VPS Folder Architecture
Use a release-based structure so deployments are safe and rollback is easy.

```bash
/var/www/arabia-backend/
├── current -> /var/www/arabia-backend/releases/20260319120000
├── releases/
│   ├── 20260317103000/
│   ├── 20260318123000/
│   └── 20260319120000/
├── shared/
│   ├── .env
│   ├── public/
│   ├── logs/
│   └── backups/
```

### Meaning
- `releases/` = every deployment gets a separate folder
- `current/` = symlink to the active release
- `shared/.env` = live environment file
- `shared/public/` = persistent uploads/static files
- `shared/logs/` = optional centralized logs
- `shared/backups/` = database or file backups

---

## 3. Environment Variables Strategy
Do not make `.env` random. Keep it structured.

### Backend production `.env` example
```env
NODE_ENV=production
PORT=5000

APP_NAME=Arabia Backend
APP_ENV=production
APP_URL=https://api.example.com
FRONTEND_URL=https://example.com

DB_HOST=127.0.0.1
DB_PORT=3306
DB_NAME=arabia_db
DB_USER=arabia_user
DB_PASS=strongpassword

JWT_SECRET=supersecret
JWT_EXPIRES_IN=7d

BCRYPT_ROUNDS=10

MAIL_HOST=smtp.host.com
MAIL_PORT=587
MAIL_USER=test@example.com
MAIL_PASS=password
MAIL_FROM=no-reply@example.com

CLOUDINARY_CLOUD_NAME=xxx
CLOUDINARY_API_KEY=xxx
CLOUDINARY_API_SECRET=xxx

REDIS_HOST=127.0.0.1
REDIS_PORT=6379

LOG_LEVEL=info
```

### Frontend `.env` example
```env
VITE_API_URL=https://api.example.com
VITE_APP_URL=https://example.com
```

### Local backend `.env` example
```env
NODE_ENV=development
PORT=5000
APP_URL=http://localhost:5000
FRONTEND_URL=http://localhost:5173
DB_HOST=127.0.0.1
```

### Rules
- Local uses localhost URLs
- Production uses real domains
- App internal port can stay `5000`
- Public users should access the app through domain, not direct port
- Nginx should proxy domain to app port

---

## 4. Port Planning
A lot of production issues happen because ports were not planned properly.

### Good setup
- Frontend via Nginx
- Backend internal port: `5000`
- MySQL: `3306` internal only
- Redis: `6379` internal only
- SSH: `22` or custom
- Public open ports:
  - `80`
  - `443`

### Rule
Do not expose the database publicly unless absolutely necessary.

---

## 5. Local vs Production Dependencies
Keep dependencies clean from day one.

### Install dependencies
```bash
npm install
```

### Install dev-only tools
```bash
npm install -D nodemon eslint prettier
```

### Install only production dependencies on server
```bash
npm ci --omit=dev
```

### Rule
- `dependencies` = required on production server
- `devDependencies` = only for local development, linting, formatting, testing, hot reload, etc.

### Typical production dependencies
- express
- cors
- dotenv
- jsonwebtoken
- bcrypt
- mongoose / mysql2 / prisma / pg

### Typical dev dependencies
- nodemon
- eslint
- prettier
- husky
- lint-staged

### Important
Always commit `package-lock.json`.

---

## 6. Static Files / Images Handling
This is one of the most commonly missed planning areas.

### Option 1: Store uploads on VPS shared folder
Good for small to medium apps.

```bash
/shared/public/uploads
```

Then each release links to shared public:

```bash
current/public -> shared/public
```

#### Pros
- simple
- cheap
- easy to manage

#### Cons
- if VPS is lost and there is no backup, files are gone

### Option 2: Use cloud storage
Better for serious production apps.

Examples:
- Cloudinary
- AWS S3
- DigitalOcean Spaces

#### Pros
- safer
- scalable
- better for CDN

#### Cons
- more setup
- extra cost

### Recommendation
- Small projects: VPS shared uploads are okay
- Serious apps: use Cloudinary or S3

---

## 7. Database Planning
Before going live, decide clearly:

- MySQL / PostgreSQL / MongoDB
- Local DB name
- Production DB name
- Migration flow
- Seed flow
- Backup flow
- Restore flow

### Rule
Never change production database manually without backup.

### Example package scripts
```json
{
  "scripts": {
    "dev": "nodemon app.js",
    "start": "node app.js",
    "migrate": "node scripts/migrate.js",
    "seed": "node scripts/seed.js"
  }
}
```

---

## 8. Reverse Proxy with Nginx
Node apps should usually run behind Nginx.

### Example backend Nginx config
```nginx
server {
    server_name api.example.com;

    location / {
        proxy_pass http://127.0.0.1:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

### Why Nginx is important
- SSL termination
- domain routing
- hides app port
- better production handling

---

## 9. Process Manager with PM2
PM2 is a good choice for Node.js production processes.

### ecosystem.config.cjs example
```js
module.exports = {
  apps: [
    {
      name: "arabia-backend3",
      script: "app.js",
      cwd: "/var/www/arabia-backend/current",
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
        PORT: 5000
      }
    }
  ]
};
```

### First-time setup
```bash
pm2 start ecosystem.config.cjs
pm2 save
pm2 startup
```

---

## 10. Git Setup from Day One
Keep your repository clean from the beginning.

### Suggested branches
- `main` = production
- `develop` = development or staging
- feature branches like:
  - `feature/login`
  - `feature/product-api`

### Commit style
- `feat: add auth routes`
- `fix: resolve image upload bug`
- `refactor: clean user service`
- `chore: update deploy workflow`

### Suggested `.gitignore`
```gitignore
node_modules
.env
dist
build
uploads
coverage
*.log
```

### Do not commit
- `.env`
- private keys
- production uploads
- accidental backups

---

## 11. GitHub Secrets for CI/CD
For deployment workflow, keep these in GitHub secrets:

- `VPS_HOST`
- `VPS_USER`
- `VPS_SSH_KEY`
- `BACKEND_PATH`

Optional useful additions:
- `SSH_PORT`
- `PM2_APP_NAME`
- `HEALTH_CHECK_URL`
- `APP_PORT`

---

## 12. Health Endpoint
Always add a health check route.

```js
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});
```

### Why it matters
- deployment verification
- uptime checks
- debugging
- CI/CD testing

---

## 13. VPS Base Setup Commands
On VPS, install the required core tools.

### Usually needed
- Node.js LTS
- npm
- PM2
- Nginx
- Git
- UFW firewall
- DB server (MySQL/Postgres/MongoDB)
- Certbot or SSL method
- fail2ban (optional but recommended)

### Create project directories
```bash
mkdir -p /var/www/arabia-backend/releases
mkdir -p /var/www/arabia-backend/shared/public
mkdir -p /var/www/arabia-backend/shared/backups
mkdir -p /var/www/arabia-backend/shared/logs
```

### Create/upload env file
```bash
/var/www/arabia-backend/shared/.env
```

---

## 14. SSL and Domain Setup
Before going live:

- point domain/subdomain A record to VPS IP
- configure Nginx server block
- enable SSL
- redirect HTTP to HTTPS
- verify certificate renewal

### Public URLs example
- Frontend: `https://example.com`
- Backend: `https://api.example.com`

---

## 15. Deployment Flow (Recommended)
A safe production deployment flow should look like this:

1. Checkout code
2. Create new release folder
3. Upload code to release folder
4. Link shared `.env`
5. Link shared uploads/public folder
6. Install dependencies with `npm ci --omit=dev`
7. Run migrations if needed
8. Test release on temporary port
9. Switch `current` symlink atomically
10. Reload PM2
11. Run post-deploy health check
12. Clean old releases
13. Keep rollback path ready

---

## 16. Improved GitHub Actions Deployment Workflow
Your current workflow is good, but these improvements are recommended:

### Improvements
1. Use `npm ci --omit=dev` instead of `npm install --production`
2. Test the new release on a temporary port instead of the live app port
3. Add migration step if your DB changes
4. Keep rollback steps documented
5. Validate that `shared/.env` and `shared/public` exist before deploy
6. Prefer proper SSH host verification instead of always disabling strict host checking

### Problem in simple health-check testing
If you run a temporary test on the same port as the live app, your health check may accidentally hit the old app instead of the new release.

### Better approach
- temporary test port like `5050`
- curl `127.0.0.1:5050/api/health`
- only switch live symlink after success

---

## 17. Rollback Strategy
Rollback must be written clearly before production issues happen.

### Manual rollback steps
```bash
cd /var/www/arabia-backend/releases
ls -1dt */

ln -sfn /var/www/arabia-backend/releases/<old-release> /var/www/arabia-backend/current
cd /var/www/arabia-backend/current
pm2 reload ecosystem.config.cjs --only arabia-backend3 --update-env
```

### Rule
Write rollback commands in README or internal deployment notes. During a production issue, written steps save time.

---

## 18. Backup Strategy
Backups are not optional for production.

### Must back up
- database
- shared uploads/public
- important config files

### Keep backups in
```bash
/var/www/arabia-backend/shared/backups
```

### Better option
Also send backups to external storage:
- another server
- S3
- cloud bucket

### Minimum recommendation
- daily DB backup
- periodic uploads backup
- test restore process sometimes

---

## 19. Firewall and Basic Security
Do not skip this.

### Allow only required ports
- `22` for SSH
- `80` for HTTP
- `443` for HTTPS

### Better practices
- use non-root deploy user
- disable password login if using SSH keys
- use fail2ban
- keep system updated
- avoid exposing DB publicly
- do not commit secrets in git

---

## 20. Monitoring and Logs
At minimum, monitor these:

- PM2 process status
- PM2 logs
- Nginx logs
- disk usage
- memory usage
- SSL expiration
- health endpoint

### Log caution
Without log cleanup or rotation, logs can fill the server disk.

---

## 21. Full New Project Setup Checklist

### Phase 1 — Planning
- project name
- frontend domain
- backend domain
- live server IP
- local ports
- production ports
- database type
- image storage strategy
- auth method
- mail service
- backup plan

### Phase 2 — Local Project Setup
- initialize repo
- create frontend and backend folders
- create `.gitignore`
- create `.env.example`
- install dependencies
- setup package scripts
- setup lint / prettier
- add health route
- setup error handling
- setup logging
- setup uploads strategy

### Phase 3 — VPS Base Setup
- install Node.js
- install PM2
- install Nginx
- install DB
- setup firewall
- setup SSL
- create release/shared folders
- create live `.env`

### Phase 4 — Domain and SSL
- point domain to VPS
- configure Nginx
- enable SSL
- redirect HTTP to HTTPS
- verify domain works

### Phase 5 — App Process Setup
- create `ecosystem.config.cjs`
- do first manual deploy
- test PM2
- `pm2 save`
- `pm2 startup`

### Phase 6 — CI/CD Setup
- push code to GitHub
- add GitHub secrets
- create deploy workflow yml
- trigger deploy
- verify release folder
- verify current symlink
- verify health endpoint

### Phase 7 — Backup and Rollback
- DB backup script
- uploads backup script
- rollback steps documented
- keep last 5 releases
- setup cron if needed

### Phase 8 — Monitoring
- PM2 logs
- Nginx logs
- disk check
- SSL check
- memory check
- app status check

---

## 22. What Is Commonly Missed
Even experienced developers forget these:

- `.env.example`
- `package-lock.json`
- health endpoint
- Nginx config planning
- SSL auto-renewal
- firewall rules
- DB backup strategy
- uploads backup strategy
- log rotation
- non-root deploy user
- staging environment
- CORS setup
- migration strategy
- PM2 restart persistence after reboot
- custom error handling

---

## 23. Recommended Monorepo Structure
```bash
project/
├── frontend/
├── backend/
├── .github/
│   └── workflows/
│       ├── deploy-backend.yml
│       └── deploy-frontend.yml
├── README.md
└── .gitignore
```

This is a clean and practical structure for full-stack projects.

---

## 24. Suggested Backend `package.json` Scripts
```json
{
  "scripts": {
    "dev": "nodemon app.js",
    "start": "node app.js",
    "lint": "eslint .",
    "test": "echo \"Add tests\"",
    "migrate": "node scripts/migrate.js",
    "seed": "node scripts/seed.js"
  }
}
```

---

## 25. Recommended Final Rule Before Going Live
Before production deployment, verify these 12 points:

1. Domain ready
2. SSL ready
3. Nginx ready
4. PM2 ready
5. `.env` ready
6. Database ready
7. Health route ready
8. Upload strategy ready
9. Backup ready
10. Rollback ready
11. GitHub secrets ready
12. Deploy workflow tested

If these are ready, most projects run smoothly.

---

## 26. Final Advice
Make one reusable project SOP for yourself containing:

- project info
- domains
- ports
- env variables
- VPS folders
- Nginx config
- PM2 config
- deployment flow
- rollback steps
- backup steps
- common mistakes

This makes every future project faster, safer, and more professional.

