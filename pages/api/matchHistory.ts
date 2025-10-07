import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../prisma/prismaClient';
import { getSession } from 'next-auth/react';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: true, message: 'Method Not Allowed' });
  }
  try {
    const skip = Number(req.body.skip ?? 0);
    const session = await getSession({ req });
    if (!session) {
      return res.status(401).json({ error: true, message: 'Unauthorized' });
    }
    const matches = await prisma.matches.findMany({
      where: { userId: session.user.id },
      orderBy: { createdAt: 'desc' },
      skip: skip < 0 ? 0 : skip,
      take: 10,
    });
    return res.status(200).json({ error: false, matches });
  } catch (e: unknown) {
    if (e instanceof Error) {
      return res.status(500).json({ error: true, message: e.message });
    }
  }
  return res.status(500).json({ error: true, message: 'Unknown error' });
};

export default handler;
