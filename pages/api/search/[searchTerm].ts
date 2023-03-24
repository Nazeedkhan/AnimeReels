import { client } from "@/utils/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { searchPostsQuery } from "@/utils/queries";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    const { searchTerm } = req.query;

    const videosQuery = searchPostsQuery(searchTerm as string);

    const videos = await client.fetch(videosQuery);

    res.status(200).json(videos);
  }
}
