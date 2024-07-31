import mongoose from "mongoose";

const adminSchema = mongoose.Schema(
  {
    shopname: {
      type: String,
      required: true,
      trim: true,
    },

    photo: {
      data: Buffer,
      contentType: String,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: {},
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    role: {
      type: Number,
      default: 1,
    },
  },
  { timestamps: true }
);

export default mongoose.model("shops", adminSchema);
