import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma/prismaClient';
import { getSession } from 'next-auth/react';

// get the last 50 matches for the user
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (session) {
      const matches = await prisma.matches.findMany({
        where: { userId: session.user.id },
        orderBy: { createdAt: 'desc' },
        take: 50,
      });
      res.status(200).json({ error: false, matches: matches });
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(500).json({ error: e.message });
    }
  }
};
