import axios from 'axios';

export class UsuariosService{
    baseUrl = "http://localhost:8080/usuarios";

    getAll(){
        return axios.get(this.baseUrl + "/mostrar").then(res =>res.data);
    }
}