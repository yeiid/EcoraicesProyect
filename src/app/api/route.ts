import { NextApiRequest, NextApiResponse } from 'next';
import {Form} from '@/app/lib/types'

export  const GET =(req: NextApiRequest, res: NextApiResponse)=>{

    try {
      const formData: FormData = req.body;
  
      // console.log(formData)
      res.status(200).send({ message: 'Petición GET exitosa' });
    } catch (error) {
      console.error('Error al obtener datos:', error);
      res.status(500).send({ error: 'Error interno del servidor' });
    }
  } 




// export default async function handler(req: NextApiRequest, res: NextApiResponse) {
// if (req.method === 'POST') {
//     try {
//       const formData: Form = req.body;

//       if (!formData.especie || !formData.municipio || !formData.ciudadano) {
//         return res.status(400).json({ error: 'Todos los campos son obligatorios' });
//       }

//       const { especie, municipio, ciudadano } = formData;

//       // Guardar datos en la base de datos o realizar cualquier otra acción necesaria
//       // ...

//       res.status(200).json({ message: 'Datos guardados exitosamente' });
//     } catch (error) {
//       console.error('Error al guardar datos:', error);
//       res.status(500).json({ error: 'Error interno del servidor' });
//     }
//   } else {
//     res.status(405).json({ error: 'Método no permitido' });
//   }
// }


