// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
  name: string
}

/**
 * Didn't use that, I always get error for invalid JSON in the body,
 * I think its related to missing middlewares (which appear in the express app) - bodyparser and maybe cors ( don't think cors related)
 * I tried to add it here, but didn't wanted to waste too much time on it. so I finished the task with the express proxy.
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
      const proxyReqHeaders: HeadersInit = new Headers();
      proxyReqHeaders.set("Content-Type", "application/json");
      proxyReqHeaders.set("Accept", "application/json");
      proxyReqHeaders.set("Authorization", req.headers["authorization"] ?? "");
      const proxyResp = await fetch("https://api.yelp.com/v3/graphql", {
          method: req.method,
          headers: proxyReqHeaders,
          body: req.body,
      });
      const data = await proxyResp.json();
      res.setHeader('Content-Type', proxyResp.headers.get("content-type") ?? 'application/json');
      res.setHeader('Cache-Control', proxyResp.headers.get("cache-control") ?? "max-age=0");
      res.status(200).end(data);
  } catch (error) {
      res.json(error);
      res.status(405).end();
  }
}

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '1mb',
    },
    externalResolver: true,
  },
}