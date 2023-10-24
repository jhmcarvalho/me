import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const response = await fetch(
    `https://cafe.jeffs.me/_activity/map${
      req.query.dark != undefined ? "?dark" : "?light"
    }`
  ).then((res) => res.json());

  res.status(200).json(response);
};

export default handler;
