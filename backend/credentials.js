const express = require("express")
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require("mongoose")
const cors = require("cors")
require('dotenv').config()

const PORT = 3001

const app = express()
app.use(express.json())
app.use(cors({
    origin: "http://localhost:3000",
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}))

const JWT_SECRET = process.env.JWT_SECRET

mongoose.connect("mongodb+srv://alexsam:Alexsam14@cluster0.w04wli6.mongodb.net/HLC", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('Error connecting to MongoDB', err);
});

const UsersSchema = new mongoose.Schema({
   name: { type: String, required: true},
   email: { type: String, required: true, unique: true},
   password: { type: String, required: true },
   medications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Medication' }]
}, {strict: true})
const users = mongoose.model("Users", UsersSchema);

// Add this new schema for storing invalidated tokens
const TokenBlacklistSchema = new mongoose.Schema({
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
});

const TokenBlacklist = mongoose.model("TokenBlacklist", TokenBlacklistSchema);

// Middleware to verify JWT token
const verifyToken = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    return res.status(403).json({ message: "No token provided" });
  }

  try {
    // Check if the token is blacklisted
    const blacklistedToken = await TokenBlacklist.findOne({ token });
    if (blacklistedToken) {
      return res.status(401).json({ message: "Token is no longer valid" });
    }

    const decoded = jwt.verify(token, JWT_SECRET);
    req.userId = decoded.userId;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// ... (your existing login and register routes)

// New logout route
app.post("/logout", verifyToken, async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  try {
    const decoded = jwt.decode(token);
    const expiresAt = new Date(decoded.exp * 1000); // Convert expiration time to milliseconds

    // Add the token to the blacklist
    const blacklistedToken = new TokenBlacklist({
      token,
      expiresAt,
    });
    await blacklistedToken.save();

    res.json({ message: "Logged out successfully" });
  } catch (error) {
    console.error('Logout error: ', error);
    res.status(500).json({ message: "Server error during logout" });
  }
});



app.post("/login", async (req, res) => {
  const {email, password} = req.body;

  try {
    const user = await users.findOne({email: email});
    if (!user) {
      console.log('User not found');  
      return res.status(404).json("No record exists");
    }
    
    const isMatch = await bcrypt.compare(password, user.password);
    
    if (!isMatch) {
      console.log('Incorrect password');   
      return res.status(400).json("The password is incorrect");
    }
    
    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1h' });
    res.json({token, message: "Success"});
  } catch (error) {
    console.error(error);
    res.status(500).json("Server error");
  }
});

app.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
          return res.status(400).json({ message: "All fields are required" });
        }
        
        // Check if email already exists
        const existingUser = await users.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ message: "Email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new users({
          name,
          email,
          password: hashedPassword,
          medications: []  // Initialize empty medications array
        });
        await user.save()
        res.status(201).json("User created succesfully");
      } catch (err) {
        console.error('Registration error: ', err)
        if (err.code === 11000) {
          return res.status(400).json({ message: "Username or email already exists" });
        }
        res.status(500).json("Server error");
      }
})

setInterval(async () => {
  const now = new Date();
  await TokenBlacklist.deleteMany({ expiresAt: { $lt: now } });
}, 24 * 60 * 60 * 1000); // Run daily

app.listen(PORT, function(){
    (`Credentials Server is running on port ${PORT}`);
  })
  