import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma/prismaClient';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (session) {
      const userStats = await prisma.matches.aggregate({
        where: {
          userId: session.user.id,
        },
        _avg: {
          WPM: true,
          accuracy: true,
        },
        _count: true,
      });
      res.status(200).json({ error: false, userStats: userStats });
    } else {
      res.status(401).json({ error: true, message: 'Unauthorized' });
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({ error: true, errorMessage: e.message });
    }
  }
};
