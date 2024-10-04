import { NextApiRequest, NextApiResponse } from 'next';
import { prisma } from '@/lib/prisma';
import { schema } from '@/app/lib/schema';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    try {
      const validatedData = schema.parse(req.body);
      
      const { data, location, userId } = validatedData;

      const newEspecie = await prisma.especie.create({
        data: {
          ...data,
          latitud: location.lat,
          longitud: location.lng,
          userId: userId,
        },
      });

      res.status(200).json({ success: true, data: newEspecie });
    } catch (error) {
      res.status(400).json({ success: false, error: 'Invalid data' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}