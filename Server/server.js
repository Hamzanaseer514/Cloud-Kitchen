const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const multer = require('multer');
const path = require('path');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();
const PORT = process.env.PORT || 5000;
app.use(
  cors({
    // origin: "http://localhost:5173", 
    origin: process.env.CLIENT_URL, 
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

const storage = multer.diskStorage({
  destination: './Upload/Images',
  filename: (req, file, cb) => {
      return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage: storage });
app.use('/images', express.static("Upload/Images"));
app.post("/uploadimage", upload.single('image'), (req, res) => {
  if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
  }
  res.json({
      success: true,
      image_url: `hhttps://cloudkitchen-w5xa.onrender.com/images/${req.file.filename}`
  });
});

// // Middleware
// app.use(
//   cors({
//     origin: "http://localhost:5173", // ✅ Only allow React app
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type", "Authorization"],
//   })
// );

// app.options("*", cors()); // ✅
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Routes
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to the Cloud Kitchen API, hamza' });
});

// API routes
app.use('/api', require('./routes/api'));

// Error handling middleware
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});