/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO POST
 * A LA API PARA GUARDAR UNA NOTA.
 */

 import { requestApi } from '../../utils/httpClient';
 
 export async function createNote(body) { 
    
     try {

        //const tokenUsuario = 'Bearer ' + token;
        
        const data = await requestApi('/notes', 'POST', body, null);
        
        return data;
        
     } catch (e) {
        return {error: true, message: e, servidor: true}
     }    
 }