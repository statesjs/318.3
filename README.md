# LAB 318

This assignment will ask you to expand the example REST API application that was explored during the lesson, adding additional routes and features that are common with an API of its kind.

## Description

- **data/**:  
  Contains the in-memory arrays for managing data. These files export data that is used by the routes (e.g., `comments.js` for comments, `posts.js` for posts, and `users.js` for users).

- **routes/**:  
  Contains the Express route definitions.

  - `comments.js` handles endpoints under `/api/comments`
  - `posts.js` handles endpoints under `/api/posts`
  - `users.js` handles endpoints under `/api/users`

- **utilities/**:  
  Contains utility modules such as custom error handlers (e.g., `error.js`).

- **index.js**:  
  The main server file where the Express application is configured, middleware is set up, and the routes are mounted.

- **package.json**:  
  Defines the project settings, lists dependencies, and includes scripts for running the app.

## How to Run

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd your-project-root
   ```

## Getting Started

### Dependencies

- nodemon
- express

## File Structure

```bash
/your-project-root
├── data
│ ├── comments.js // In-memory comments data
│ ├── posts.js // In-memory posts data
│ └── users.js // In-memory users data
├── routes
│ ├── comments.js // Routes for handling /api/comments endpoints
│ ├── posts.js // Routes for handling /api/posts endpoints
│ └── users.js // Routes for handling /api/users endpoints
├── utilities
│ └── error.js // Custom error helper/middleware
├── index.js // Main application file to set up Express, middleware, and mount routers
├── package.json // Project configuration and dependencies
└── README.md // This right here
```
