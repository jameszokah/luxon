import mongoose, { Document, Model, Schema } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const emailRegexPattern: RegExp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ISuperAdmin extends Document {
  name: string;
  email: string;
  password: string;
  avatar?: {
    public_id: string;
    url: string;
  };
  role: string;
  comparePassword: (password: string) => Promise<boolean>;
  SignRefreshToken: () => string;
  SignAccessToken: () => string;
}

const superAdminSchema: Schema<ISuperAdmin> = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please enter your name"],
    },
    email: {
      type: String,
      required: [true, "Please enter your email"],
      validate: {
        validator: function (value: string) {
          return emailRegexPattern.test(value);
        },
        message: "Please enter a valid email",
      },
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Please enter your password"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    avatar: {
      public_id: String,
      url: String,
    },
    role: {
      type: String,
      default: "superadmin",
    },
  },
  { timestamps: true }
);

// Hash password
superAdminSchema.pre<ISuperAdmin>("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Sign access token
superAdminSchema.methods.SignAccessToken = function () {
  return jwt.sign({ id: this._id }, process.env.ACCESS_TOKEN || "", {
    expiresIn: "5m",
  });
};

// Sign refresh token

superAdminSchema.methods.SignRefreshToken = function () {

  return jwt.sign({ id: this._id }, process.env.REFRESH_TOKEN || "", {

    expiresIn: "7d",

  });

};

// Compare password
superAdminSchema.methods.comparePassword = async function (
  enteredPassword: string
): Promise<boolean> {
  return await bcrypt.compare(enteredPassword, this.password);
};

const SuperAdminModel: Model<ISuperAdmin> = mongoose.model(
  "SuperAdmin",
  superAdminSchema
);

export default SuperAdminModel;
