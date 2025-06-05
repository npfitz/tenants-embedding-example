const express = require("express");
const jwt = require("jsonwebtoken");
const url = require("url");
const path = require("path"); // Core Node.js module for working with file paths

const app = express();
const port = process.env.PORT || 4000;
const METABASE_HOST = "http://localhost:3000";
const METABASE_JWT_URL = `${METABASE_HOST}/auth/sso`;
const API_KEY = "";
const JWT_TOKEN = "";

// --- Middleware ---

// 1. Body parsing middleware: To parse JSON and URL-encoded request bodies
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// --- API Routes ---

app.post("/jwt", (req, res) => {
  console.log(req.params);
  const { email, firstName, lastName, tenant } = req.body;

  console.log("Login attempt received:", {
    email,
    firstName,
    lastName,
    tenant,
  });

  // Basic validation
  if (!email) {
    return res.status(400).json({ message: "Email is needed" });
  }

  res.json({
    key: jwt.sign(
      {
        email,
        first_name: firstName,
        last_name: lastName,
        tenant,
      },
      JWT_TOKEN
    ),
  });
});

app.get("/tenants", async (req, res) => {
  console.log("getting tenants");
  const request = await fetch(`${METABASE_HOST}/api/ee/tenants`, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });
  const response = await request.json();
  res.json(response);
});

app.get("/users", async (req, res) => {
  console.log("getting users");
  const request = await fetch(`${METABASE_HOST}/api/user?tenancy=all`, {
    headers: {
      "X-API-KEY": API_KEY,
    },
  });
  const response = await request.json();
  res.json(response);
});

app.get("/login", (req, res) => {
  const { key } = req.query;

  res.redirect(
    url.format({
      pathname: METABASE_JWT_URL,
      query: {
        jwt: key,
        return_to: "/",
      },
    })
  );
});

// --- Static Asset Serving ---

// 3. Serve static files from the 'public' directory
// This middleware should generally come AFTER specific API routes like '/login'.
// If a request doesn't match any of the API routes above, Express will
// try to find a corresponding file in the 'public' folder.
app.use(express.static(path.join(__dirname, "public")));

// Optional: A catch-all for any other GET requests not handled by static or API routes
// This can be used to serve a custom 404 page or your main SPA page.
// If you want all unmatched GET to go to index.html (common for SPAs):
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'public', 'index.html'));
// });
// Or, a simple 404 for any route not matched:
app.use((req, res) => {
  res.status(404).send("Sorry, can't find that!");
});

// --- Start the Server ---
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
  console.log(`Login endpoint: POST http://localhost:${port}/login`);
  console.log(
    `Static assets served from 'public' folder (e.g., http://localhost:${port}/index.html)`
  );
});
