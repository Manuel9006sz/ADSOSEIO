import axios from 'axios';

export class UsuariosService {
    baseUrl = "http://localhost:8080/usuarios";

    getAll() {
        return axios.get(this.baseUrl + "/mostrar").then((res) => res.data);
    }

    save(usuarios) {
        return axios.post(this.baseUrl + "/nuevo", usuarios).then((res) => res.data);
    }
    delete(iduser) {
        return axios.post(this.baseUrl + "/delete/" + iduser).then(res=>res.data);
    }
    
    
}
