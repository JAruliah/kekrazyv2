import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma/prismaClient';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'GET') {
    res.setHeader('Allow', 'GET');
    return res.status(405).json({ error: true, message: 'Method Not Allowed' });
  }
  try {
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: true, message: 'Unauthorized' });
    }
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
    return res.status(200).json({ error: false, userStats });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(400).json({ error: true, message: e.message });
    }
  }
  return res.status(500).json({ error: true, message: 'Unknown error' });
};

export default handler;
