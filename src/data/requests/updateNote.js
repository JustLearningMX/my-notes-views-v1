/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO GET
 * A LA API PARA TRAER LOS DATOS DE TODAS LAS NOTAS.
 */

 import { requestApi } from '../../utils/httpClient';
 
 export async function updateNote(body) { 
    
     try {

        //const tokenUsuario = 'Bearer ' + token;
        
        const data = await requestApi('/notes', 'PUT', body, null);
        
        return data;
        
     } catch (e) {
        return {error: true, message: e, servidor: true}
     }    
 }