/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO PUT
 * A LA API PARA ARCHIVAR UNA NOTA.
 */

 import { requestApi } from '../../utils/httpClient';
 
 export async function archiveNote(id) { 
    
     try {

        //const tokenUsuario = 'Bearer ' + token;
        
        const data = await requestApi(`/notes/archived/${id}`, 'PUT', null, null);
        
        return data;
        
     } catch (e) {
        return {error: true, message: e, servidor: true}
     }    
 }