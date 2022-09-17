import { NextApiRequest, NextApiResponse } from 'next';
import prisma from '../../prisma/prismaClient';

// get all matches grouped by user
export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'GET') {
    try {
      const data = await prisma.$queryRaw`
        SELECT 
          AVG(M.WPM) as WPM,
          AVG(M.accuracy) as Accuracy,
          COUNT(M.id) as TotalMatches,
          U.username
        FROM Matches M
        INNER JOIN User U ON U.id = M.userId
        GROUP BY M.userId
      `;
      const updatedData = JSON.stringify(data, (_, v) =>
        typeof v === 'bigint' ? v.toString() : v
      );
      res.status(200).send(updatedData);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
};
