const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [false, "Please tell us your username!"],
  },
  firstName: {
    type: String,
    required: [false, "Please tell us your first name!"],
  },
  middleName: {
    type: String,
    required: [false, "Please tell us your middle name!"],
  },
  lastName: {
    type: String,
    required: [false, "Please tell us your last name!"],
  },
  photo: String,
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  local: {
    email: {
      type: String,
      required: [true, "Please provide your email"],
      unique: true,
      lowercase: true,
      validate: [validator.isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: 8,
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: [true, "Please confirm your password"],
      validate: {
        // This only works on CREATE and SAVE!!!
        validator: function (el) {
          return el === this.local.password;
        },
        message: "Passwords are not the same!",
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
  },
  facebook: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
  twitter: {
    id: String,
    token: String,
    displayName: String,
    username: String,
  },
  google: {
    id: String,
    token: String,
    email: String,
    name: String,
  },
});

//==============================================================================
// Middleware ==================================================================
//==============================================================================

// Encrypt password before saving to db
userSchema.pre("save", async function (next) {
  if (!this.isModified("local.password")) return next(); // exit if no password was updated
  const encryptedPassword = await bcrypt.hash(this.local.password, 12); // Hash password
  this.local.password = encryptedPassword; // Save the encrypted password
  this.local.passwordConfirm = undefined; // Don't save passwordConfirm
  next();
});

// Track password changes
userSchema.pre("save", async function (next) {
  // exit if no password changed or if its a new user
  if (!this.isModified("local.password") || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000; // Timestamp subtract 1 second delay from query
  next();
});

// Only find active documents
userSchema.pre(/^find/, function (next) {
  // this points to the current query
  this.find({ "local.active": { $ne: false } });
  next();
});
//==============================================================================
// Methods =====================================================================
//==============================================================================

userSchema.methods.hasPasswordChanged = function (tokenCreatedAt) {
  // check if user changed password after login token was issued
  if (this.local.passwordChangedAt) {
    const passwordChangedAt = parseInt(
      this.local.passwordChangedAt.getTime() / 1000,
      10
    );
    // check if password was changed after login token was issued
    return tokenCreatedAt < passwordChangedAt; // if true token has expired
  }
  // else
  return false;
};

// Generate a hash for password or token
userSchema.methods.generateHash = function (password) {
  return bcrypt.hashSync(password, 12, null);
};

// Checking if password is valid
userSchema.methods.verifyPassword = async function (tryPassword, userPassword) {
  return await bcrypt.compare(tryPassword, userPassword);
};

// Create a password reset token
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString("hex"); // Generate random string

  // Hash the token
  this.local.passwordResetToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  console.log({ resetToken }, this.local.passwordResetToken);

  this.local.passwordResetExpires = Date.now() + 10 * 60 * 1000; // Expire in 10 minutes

  return resetToken;
};

module.exports = mongoose.model("User", userSchema);
