import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch(
            "https://api.binance.com/api/v3/ticker/price?symbol=BTCUSDT"
        );

        if (!response.ok) {
            throw new Error(`Binance API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return res.status(200).json({ price: parseFloat(data.price) });
    } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
        return res.status(500).json({ error: "Failed to fetch Bitcoin price" });
    }
};

export default handler;
