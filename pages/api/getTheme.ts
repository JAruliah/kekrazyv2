import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/prismaClient';
import { getSession } from 'next-auth/react';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const session = await getSession({ req });
    if (session) {
      const theme = await prisma.user.findFirst({
        select: {
          settings: {
            select: {
              theme: true,
            },
          },
        },
        where: {
          id: session.user.id,
        },
      });
      res.status(200).json({ error: false, theme: theme?.settings?.theme });
    }
  } catch (e: any) {
    res.status(400).json({ error: true, errorMesssage: e.message });
  }
};
