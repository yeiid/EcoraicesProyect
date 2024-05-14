

// const API_BASE_URL = 'http://api.catalogo.biodiversidad.co';

// export async function GET<T>(): Promise<T | null> {
//   try {
//     const queryParams = new URLSearchParams({ department: 'La Guajira' });
//     const response = await fetch(`${API_BASE_URL}/record_search/advanced_search?${queryParams}`);
//     if (!response.ok) {
//       throw new Error(`Error al obtener las especies en La Guajira: ${response.statusText}`);
//     }

//     const data: T = await response.json();
//     console.log('Datos descargados correctamente');
//     return data;
//   } catch (error) {
//     console.error('Error al obtener las especies en La Guajira:', error);
//     return null;
//   }
// }
