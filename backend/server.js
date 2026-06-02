const express    = require('express');
const cors       = require('cors');
const helmet     = require('helmet');
const dotenv     = require('dotenv');
const swaggerUi  = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

dotenv.config();

const app       = express();
const PORT      = process.env.PORT || 3001;
const chatRoute = require('./routes/chat');

// ── Swagger definition ──────────────────────────────
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Zoe Smiles Chatbot API',
      version: '1.0.0',
      description: 'Backend API for the Zoe Smiles dental clinic chatbot. Handles patient queries using a knowledge-base intent engine.',
    },
    servers: [
      { url: `http://localhost:${process.env.PORT || 3001}`, description: 'Local development server' }
    ],
    tags: [
      { name: 'Chat', description: 'Chatbot message endpoint' },
      { name: 'Health', description: 'Server health check' }
    ]
  },
  apis: ['./routes/*.js', './server.js']
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

// ── Security & middleware ───────────────────────────
app.use(helmet({ contentSecurityPolicy: false })); // disable CSP so Swagger UI loads
app.use(cors({
  origin: function (origin, callback) {
    callback(null, true);
  },
  credentials: true
}));
app.use(express.json());

// ── Swagger UI ──────────────────────────────────────
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, {
  customSiteTitle: 'Zoe Smiles API Docs',
  customCss: `
    .swagger-ui .topbar { background: linear-gradient(135deg, #006576, #0099B0); }
    .swagger-ui .topbar-wrapper img { display: none; }
    .swagger-ui .topbar-wrapper::before { content: '🦷 Zoe Smiles API'; color: white; font-size: 1.2rem; font-weight: bold; }
  `
}));

// ── Routes ──────────────────────────────────────────
app.use('/api/chat', chatRoute);

/**
 * @swagger
 * /health:
 *   get:
 *     summary: Server health check
 *     tags: [Health]
 *     responses:
 *       200:
 *         description: Server is running
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   example: ok
 */
app.get('/health', (req, res) => res.json({ status: 'ok' }));

// ── Start with graceful port-in-use error ───────────
const server = app.listen(PORT, () => {
  console.log(`\n✅  Zoe Chatbot API running on http://localhost:${PORT}`);
  console.log(`📖  Swagger UI available at http://localhost:${PORT}/api-docs\n`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`\n❌  Port ${PORT} is already in use.`);
    console.error(`   Run this command to free it and try again:`);
    console.error(`   npx kill-port ${PORT}\n`);
    process.exit(1);
  } else {
    throw err;
  }
});
