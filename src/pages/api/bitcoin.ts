import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
    try {
        const response = await fetch(
            "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
        );

        if (!response.ok) {
            throw new Error(`CoinGecko API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        return res.status(200).json({ price: data.bitcoin.usd });
    } catch (error) {
        console.error("Error fetching Bitcoin price:", error);
        return res.status(500).json({ error: "Failed to fetch Bitcoin price" });
    }
};

export default handler;
