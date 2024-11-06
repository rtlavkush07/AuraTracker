import mongoose from "mongoose"; // Use import for ES modules

const userProfileSchema = new mongoose.Schema(
  {
    rating: { type: Number, default: 1000 }, // Starting rating for new users
    auraCoins: { type: Number, default: 0 }, // Coins that users can spend on rewards

    badges: [{ type: String }], // Array of badge names or IDs
    vouchers: [{ type: mongoose.Schema.Types.ObjectId, ref: "Voucher" }], // Array of acquired vouchers

    purchaseHistory: [
      {
        itemId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "StoreItem",
        },
        purchaseDate: { type: Date, default: Date.now }, // Date of purchase

        cost: { type: Number, required: true }, // Cost in aura coins
      },
    ],
  },
  { _id: false }
);


export default userProfileSchema; // Export using ES module syntax
