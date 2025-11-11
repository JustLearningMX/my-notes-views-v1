/**FUNCIÓN QUE REALIZA UNA PETICIÓN HTTP DEL TIPO GET
 * A LA API PARA TRAER LOS DATOS DE TODAS LAS CATEGORIAS.
 */

 import { requestApi } from '../../utils/httpClient';
 
 export async function getCategories() { 
    
     try {

        //const tokenUsuario = 'Bearer ' + token;
        
        const data = await requestApi('/categories', 'GET', null, null);
        
        return data;
        
     } catch (e) {
        return {error: true, message: e, servidor: true}
     }    
 }