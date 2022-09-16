import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const data = req.body;
  const saltRounds = 10;
  try {
    bcrypt.hash(data.password, saltRounds, async (err, hash) => {
      await prisma.user.create({
        data: {
          username: data.username,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email,
          password: hash,
        },
      });
    });
    res.status(200).json({ error: false });
  } catch (err: any) {
    let message = '';
    let errorArray;
    let constraint;
    // if the error is due to unqiue constraints
    if (err.code == 'P2002') {
      errorArray = err.meta.target.split('_');
      constraint = errorArray[1];
      message = `${constraint} already exists`;
    }
    res.status(400).json({ error: true, message: message });
  }
};
