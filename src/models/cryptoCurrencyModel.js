import mongoose, { Schema } from 'mongoose';

const cryptoCurrencySchema = new Schema(
    {
        coinName: { type: String, required: true },
        coinPrice: { type: Number, required: true },
        marketCap: { type: Number, required: true },
        changein24h: { type: Number, required: true },
    },
    { timestamps: true }
);

export const CryptoCoin = mongoose.model('CryptoCoin', cryptoCurrencySchema);
