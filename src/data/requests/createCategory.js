/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO POST
 * A LA API PARA GUARDAR UNA O MAS CATEGORIAS.
 */

 import { requestApi } from '../../utils/httpClient';
 
 export async function createCategory(body) { 
    
     try {

        //const tokenUsuario = 'Bearer ' + token;
        
        const data = await requestApi('/categories', 'POST', body, null);
        
        return data;
        
     } catch (e) {
        return {error: true, message: e, servidor: true}
     }    
 }