import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma/prismaClient';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: true, message: 'Method Not Allowed' });
  }
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: true, message: 'Unauthorized' });
    }
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
    return res.status(200).json({ error: false });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(400).json({ error: true, message: e.message });
    }
  }
  return res.status(500).json({ error: true, message: 'Unknown error' });
};

export default handler;
