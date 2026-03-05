import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma/prismaClient';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (session) {
      await prisma.user.update({
        where: {
          id: session.user.id,
        },
        data: {
          matches: {
            create: {
              WPM: req.body.wpmScore,
              accuracy: req.body.accuracyScore,
              createdAt: req.body.startedAt,
              endedAt: req.body.endedAt,
              completionTime: req.body.timeTaken,
              quoteLength: req.body.length,
              mode: req.body.mode,
            },
          },
        },
      });
      res.status(200).json({ error: false });
    } else {
      res.status(401).json({ error: true, message: 'Unauthorized' });
    }
  } catch (e: unknown) {
    if (e instanceof Error) {
      res.status(400).json({ error: true, errorMessage: e.message });
    }
  }
};
