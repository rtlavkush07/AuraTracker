import mongoose from "mongoose"; // Use import for ES modules

const userProfileSchema = new mongoose.Schema(
  {
    rating: { type: Number, default: 1000 }, // Starting rating for new users
    auraCoins: { type: Number, default: 0 }, // Coins that users can spend on rewards
    level: { type: Number, default: 1 }, // User's level in the system
    badges: [{ type: String }], // Array of badge names or IDs
    vouchers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Voucher" }], // Array of acquired vouchers
    coupons: [{ type: mongoose.Schema.Types.ObjectId, ref: "Coupon" }], // Array of acquired coupons
    purchaseHistory: [
      {
        // Purchase history for vouchers and coupons
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "StoreItem",
        }, // Reference to the purchased item
        purchaseDate: { type: Date, default: Date.now }, // Date of purchase
        type: { type: String, enum: ["voucher", "coupon"], required: true }, // Type of item
        cost: { type: Number, required: true }, // Cost in aura coins
      },
    ],
  },
  { _id: false }
);

export default userProfileSchema; // Export using ES module syntax
