import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/prismaClient';

// get all matches grouped by user
export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const settings = req.body;
    await prisma.user.update({
      where: {
        id: settings.userId,
      },
      data: {
        settings: {
          upsert: {
            create: {
              theme: settings.theme,
            },
            update: {
              theme: settings.theme,
            },
          },
        },
      },
    });
    res.status(200).json({ error: false });
  } catch (e: any) {
    console.log(e.message);
    res.status(400).json({ error: true, message: e.message });
  }
};
