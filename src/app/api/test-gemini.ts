// src/pages/api/test-gemini.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const response = await fetch("https://gemini.api.endpoint/v1/some-test", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ prompt: "Give a short summary about mutual funds" })
    });

    const data = await response.json();
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
}
     


