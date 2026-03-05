import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma/prismaClient';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const skip = req.body.skip;
    const session = await getSession({ req });
    if (session) {
      const matches = await prisma.matches.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        skip: skip,
        take: 10,
      });
      res.status(200).json({ error: false, matches: matches });
    } else {
      res.status(401).json({ error: true, message: 'Unauthorized' });
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    }
  }
};
