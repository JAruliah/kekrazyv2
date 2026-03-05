import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '../../../prisma/prismaClient';
import bcrypt from 'bcrypt';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const data = req.body;
    if (!data.password || data.password.length < 6) {
      return res.status(400).json({ error: true, message: 'Password must be at least 6 characters' });
    }
    const saltRounds = 10;
    bcrypt.hash(data.password, saltRounds, async (err, hash) => {
      if (err) {
        return res.status(500).json({ error: true, message: 'oops something went wrong' });
      }
      try {
        // try creating a new user
        await prisma.user.create({
          data: {
            username: data.username,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            password: hash,
          },
        });
        res.status(200).json({ error: false });
      } catch (e: any) {
        // catch if there is error with creating a new user
        let message = 'oops something went wrong';
        let errorArray;
        let constraint;
        // if the error is due to unqiue constraints
        if (e.code == 'P2002') {
          errorArray = e.meta.target.split('_');
          constraint = errorArray[1];
          message = `${constraint} already exists`;
        }
        res.status(400).json({ error: true, message: message });
      }
    });
    // catch if any other error occurs
  } catch (err: unknown) {
    if (err instanceof Error) {
      let message = 'oops something went wrong';
      res.status(400).json({ error: true, message: message });
    }
  }
};
