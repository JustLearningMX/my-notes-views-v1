/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO PUT
 * A LA API PARA ELIMINAR UNA NOTA.
 */

 import { requestApi } from '../../utils/httpClient';
 
 export async function deleteNote(id) { 
    
     try {

        //const tokenUsuario = 'Bearer ' + token;
        
        const data = await requestApi(`/notes/${id}`, 'DELETE', null, null);
        
        return data;
        
     } catch (e) {
        return {error: true, message: e, servidor: true}
     }    
 }