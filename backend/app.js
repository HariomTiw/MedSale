import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import cookieParser from "cookie-parser";
import db from "./config/database.js";
import errorHandler from './middlewares/errorHandler.js';
import authRoutes from "./routes/authRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import usersRoutes from "./routes/usersRoutes.js";
import productRoutes from "./routes/productRoutes.js";
// import paymentRoutes from './routes/paymentRoutes.js'

dotenv.config();

const app = express();

// Security middleware
const isProduction = process.env.NODE_ENV === 'production';

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
  max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 200,
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});

// Apply rate limiting to all routes
app.use(limiter);

// Security headers with Helmet
app.use(helmet({
  contentSecurityPolicy: isProduction,
  crossOriginEmbedderPolicy: isProduction,
  crossOriginOpenerPolicy: isProduction,
  crossOriginResourcePolicy: isProduction,
}));

// Parse cookies
app.use(cookieParser(process.env.COOKIE_SECRET));

// Parse JSON bodies
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// CORS configuration
const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
  'http://localhost:5173',
  'https://med-sale-frontend.vercel.app'
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['set-cookie'],
    maxAge: 86400, // 24 hours
  })
);

// Set up static file serving
app.use(express.static(new URL("./public", import.meta.url).pathname));
app.use(express.static(new URL("./public/uploads", import.meta.url).pathname));

// Set up routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/users", usersRoutes);
app.use("/api/v1/products", productRoutes);
// app.use('/api/v1/payment', paymentRoutes);

// Initialize database connection
await db();

// Import error handler
import errorHandler from './middlewares/errorHandler.js';

// Global error handler
app.use(errorHandler);
  res.status(500).send("Something went wrong!");
});

// Port connection
const PORT = process.env.PORT || 3000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

// // Enable additional helmet features
// app.use(
//   helmet({
//     contentSecurityPolicy: false, // Allow inline scripts in development
//   })
// );

// // Use HTTPS in production
// if (process.env.NODE_ENV === 'production') {
//   app.use((req, res, next) => {
//     if (req.header('x-forwarded-proto') !== 'https') {
//       res.redirect(`https://${req.header('host')}${req.url}`);
//     } else {
//       next();
//     }
//   });
// }

// // Secure cookies
// app.use(cookieParser(process.env.COOKIE_SECRET));
