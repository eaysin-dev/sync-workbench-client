# Sync-Workbench Client

Sync-Workbench Client is the frontend application for the Sync-Workbench platform, designed to provide a seamless user experience for managing workforce operations. This client interacts with the Sync-Workbench API to offer role-based access control, employee management, project tracking, and more.

## Features

- **Modern UI/UX:** Built with React and Tailwind for a sleek, responsive interface.
- **Authentication & Authorization:** Secure login with JWT authentication and role-based access control.
- **Dashboard & Analytics:** Interactive charts and graphs for employee performance insights.
- **Employee Management:** Create, update, and manage employee profiles.
- **Project & Task Management:** Assign and track projects and tasks.
- **Role & Permission Management:** Fine-grained control over user roles and permissions.
- **Dark Mode & Theming:** Supports multiple themes with a customizable UI.
- **Real-time Notifications:** Get instant updates on project status, employee activities, and more.
- **Error Handling & Logging:** Graceful error boundaries with structured logging.
- **Optimized Performance:** Code splitting, lazy loading, and caching for a fast experience.

---

## I. Installation

**Using `git`**

```bash
git clone https://github.com/eaysin-dev/sync-workbench-client.git
cd sync-workbench-client
```

**Install dependencies:**

```bash
yarn install
```

## II. Configuration

1. Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
2. Update the environment variables in `.env`:
   ```dotenv
   VITE_API_BASE_URL="http://localhost:3000"
   VITE_ACCESS_TOKEN_SECRET="your-access-token-secret"
   VITE_REFRESH_TOKEN_SECRET="your-refresh-token-secret"
   ```

## III. Development

Start the development server:

```bash
yarn dev
```

- 🌏 Frontend Server: http://localhost:5173
- 🔌 API Endpoint: Configured via `VITE_API_BASE_URL`

## IV. Deployment

**Build and Run without Docker**

```bash
yarn build
npx serve -s dist
```

**Run with Docker**

```bash
docker build -t sync-workbench-client .
docker run -p 5173:5173 sync-workbench-client
```

**Run with Docker Compose**

```bash
docker-compose up
```

## Environment Variables

| Variable Name            | Type   | Default Value                | Description                                  |
|--------------------------|--------|------------------------------|----------------------------------------------|
| `VITE_API_BASE_URL`      | string | `http://localhost:3000`       | Base URL for API requests.                   |
| `VITE_ACCESS_TOKEN_SECRET` | string | `your-access-token-secret`  | Secret key used for signing JWT tokens.     |
| `VITE_REFRESH_TOKEN_SECRET` | string | `your-refresh-token-secret` | Secret key used for refreshing JWT tokens.  |

### Notes:
- Ensure sensitive information remains secure and not committed to version control.

## Directory Structure

```
+-- .env
+-- .gitignore
+-- README.md
+-- components.json
+-- eslint.config.js
+-- index.html
+-- package.json
+-- postcss.config.js
+-- public/
|   +-- vite.svg
+-- src/
|   +-- App.tsx
|   +-- api/
|   |   +-- API.ts
|   |   +-- auth/
|   |   |   +-- auth-api.ts
|   |   |   +-- auth-slice.ts
|   |   +-- employee/
|   |   |   +-- employee-api.ts
|   |   |   +-- employee-slice.ts
|   |   +-- users/
|   |   |   +-- users-api.ts
|   +-- app/
|   |   +-- store.ts
|   +-- assets/
|   |   +-- react.svg
|   +-- components/
|   |   +-- ui/
|   |   |   +-- button.tsx
|   |   |   +-- input.tsx
|   |   |   +-- modal.tsx
|   |   +-- loader.tsx
|   |   +-- search-input.tsx
|   |   +-- theme-toggle.tsx
|   |   +-- pagination/
|   |   |   +-- index.tsx
|   +-- features/
|   |   +-- auth/
|   |   |   +-- login.tsx
|   |   |   +-- register.tsx
|   |   +-- overview/
|   |   |   +-- page.tsx
|   |   +-- users/
|   |   |   +-- _components/
|   |   |   |   +-- forms/
|   |   |   |   |   +-- user-create.tsx
|   |   |   |   |   +-- user-edit.tsx
|   |   |   |   +-- table/
|   |   |   |   |   +-- columns.tsx
|   |   |   |   |   +-- filters.tsx
|   |   |   +-- _hooks/
|   |   |   |   +-- use-user-create.ts
|   |   |   |   +-- use-user-edit.ts
|   |   |   |   +-- use-users.ts
|   |   |   +-- index.tsx
+-- vite.config.ts
```

## Testing

Run tests using Jest:

```bash
yarn test
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.

## Contributing

Feel free to submit issues or pull requests on GitHub.

## Contact

For queries, please reach out to Eaysin Arafat via the repository's issue tracker.

