import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please provide a name"],
      trim: true,
      maxlength: [50, "Name cannot be more than 50 characters"],
    },
    email: {
      type: String,
      required: [true, "Please provide an email"],
      unique: true,
      lowercase: true,
      trim: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Please provide a password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false, // Don't include password in query results by default
    },
    lastLogin: {
      type: Date,
    },
    dailyReflections: {
      date: {
        type: String,
        default: null,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  try {
    const salt = await bcrypt.genSalt(
      parseInt(process.env.BCRYPT_SALT_ROUNDS) || 12
    );
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (error) {
    throw new Error("Password comparison failed");
  }
};

// Method to check and update daily reflection attempts
userSchema.methods.canGenerateReflection = function () {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const DAILY_LIMIT = 3;

  // Reset counter if it's a new day
  if (this.dailyReflections.date !== today) {
    this.dailyReflections.date = today;
    this.dailyReflections.count = 0;
  }

  return this.dailyReflections.count < DAILY_LIMIT;
};

// Method to increment reflection count
userSchema.methods.incrementReflectionCount = function () {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD

  // Reset counter if it's a new day
  if (this.dailyReflections.date !== today) {
    this.dailyReflections.date = today;
    this.dailyReflections.count = 0;
  }

  this.dailyReflections.count += 1;
};

// Method to get remaining attempts
userSchema.methods.getRemainingAttempts = function () {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  const DAILY_LIMIT = 3;

  // Reset counter if it's a new day
  if (this.dailyReflections.date !== today) {
    return DAILY_LIMIT;
  }

  return DAILY_LIMIT - this.dailyReflections.count;
};

// Method to generate safe user object (without sensitive data)
userSchema.methods.toSafeObject = function () {
  const userObject = this.toObject();
  delete userObject.password;
  return userObject;
};

export default mongoose.model("User", userSchema);
