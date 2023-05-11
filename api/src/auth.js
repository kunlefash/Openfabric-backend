const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");
  return secretKey;
};

const secretKey = generateSecretKey();
// Function to generate a JWT
function generateToken(payload) {
  return jwt.sign(payload, secretKey, { expiresIn: "1h" });
}

// Function to verify a JWT
function verifyToken(token) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
}

// Function to hash a password
async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Function to compare passwords
function comparePasswords(password, hashedPassword) {
  return bcrypt.compare(password, hashedPassword);
}
module.exports = {
  comparePasswords,
  hashPassword,
  verifyToken,
  generateToken,
};
