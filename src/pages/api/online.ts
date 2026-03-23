import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const userId = process.env.DISCORD_USER_ID;

    if (!userId) {
      return res.status(500).json({ error: "DISCORD_USER_ID environment variable is missing." });
    }

    const response = await fetch(`https://api.lanyard.rest/v1/users/${userId}`);

    if (!response.ok) {
      throw new Error(`Lanyard API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error("Error fetching Discord status:", error);
    return res.status(500).json({ error: "Failed to fetch Discord status" });
  }
};

export default handler;
