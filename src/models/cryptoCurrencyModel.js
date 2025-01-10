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

const cryptoCoin = mongoose.model('cryptoCoin', cryptoCurrencySchema);
export default cryptoCoin
