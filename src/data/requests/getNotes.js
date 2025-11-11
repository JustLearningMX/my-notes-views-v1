/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO GET
 * A LA API PARA TRAER LOS DATOS DE TODAS LAS NOTAS.
 */

 import { requestApi } from '../../utils/httpClient';
 
 export async function getNotes() { 
    
     try {

        //const tokenUsuario = 'Bearer ' + token;
        
        const data = await requestApi('/notes', 'GET', null, null);
        
        return data;
        
     } catch (e) {
        return {error: true, message: e, servidor: true}
     }    
 }