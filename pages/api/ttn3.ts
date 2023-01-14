import { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  if (request.method === "POST") {
    console.log(request.body);
    response.status(200).json({
      body: request.body,
      query: request.query,
      cookies: request.cookies,
    });
  } else {
    response.status(405).json({ message: "Method Not Allowed" });
  }
}
