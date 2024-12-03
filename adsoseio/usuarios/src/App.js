import './App.css';
import "primereact/resources/themes/bootstrap4-dark-purple/theme.css";
import 'primeicons/primeicons.css';
import { UsuariosService } from './services/UsuariosService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import React, { Component } from 'react';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
        

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      usuarios: [], // Estado inicial como arreglo vacío
      visible: false,
      usuariosForm: {
        iduser: null,
        nomuser: null,
        apellido: null,
        email: null,
      },
      selectedUsuarios:{

      }
    };
    this.items = [
      {
        label: "Nuevo",
        icon: "pi pi-fw pi-user-plus",
        command: () => {
          this.showSaveDialog();
        },
      },
      {
        label: "Editar",
        icon: "pi pi-fw pi-user-edit",
        command: () => {this.showEditDialog()
        }
      },
      {
        label: "Eliminar",
        icon: "pi pi-fw pi-user-minus",
        command: () => {this.delete()
        },
      },
    ];
    this.usuariosService = new UsuariosService();
    this.save = this.save.bind(this);
    this.footer = (
      <div>
        <Button label="Guardar" icon="pi pi-check" onClick={this.save} />
      </div>
    );
    this.Toast = React.createRef();
  }

  componentDidMount() {
    this.usuariosService.getAll().then((data) => {
      if (Array.isArray(data)) {
        this.setState({ usuarios: data });
      } else {
        console.error("El servicio no devolvió un arreglo. Datos:", data);
        this.setState({ usuarios: [] });
      }
    });
  }

  save() {
    const { usuariosForm } = this.state;  // Usamos solo usuariosForm
    this.usuariosService.save(usuariosForm).then((data) => {
      this.setState({
        visible:false,
        usuariosForm: { 
          iduser: null, 
          nomuser: null, 
          apellido: null, 
          email: null 
        }
        
      });
      this.setState({ visible: false }); // Cerrar el diálogo después de guardar
      this.componentDidMount(); // Recargar los usuarios
    }).catch((error) => {
      console.error("Error al guardar el usuario:", error);
    });
    this.Toast.current.show({severity:"succes", summary: "Atención!", detail:"se guardó el registro correctamente"});
    this.usuariosService.getAll().then((data) => {
      if (Array.isArray(data)) {
        this.setState({ usuarios: data });
      } else {
        console.error("El servicio no devolvió un arreglo. Datos:", data);
        this.setState({ usuarios: [] });
      }
    });
  }

  delete(){
    if(window.confirm("¿Desea eliminar el registro")){
      this.usuariosService.delete(this.state.selectedUsuarios.iduser).then(data=>{
      this.Toast.current.show({severity:"succes", summary: "Atención!", detail:"se eliminó el registro correctamente"});
      this.usuariosService.getAll().then((data) => this.setState({usuarios: data}));

      });
    }
  }
  render() {
    return (
      <div style={{ width: "80%", margin: "20px auto 0px" }}>
        <Menubar model={this.items} />
        <br />
        <Panel header="Gestión de Usuarios">
          <DataTable value={this.state.usuarios || []} paginator rows={3} rowsPerPageOptions={[5, 10, 25, 50]} selectionMode="single" selection={this.state.selectedUsuarios} onSelectionChange={(e)=> this.setState({selectedUsuarios: e.value})}> 
            <Column field="iduser" header="ID Usuario"></Column>
            <Column field="nomuser" header="Nombres"></Column>
            <Column field="apellido" header="Apellidos"></Column>
            <Column field="email" header="Email"></Column>
          </DataTable>
        </Panel>

        <Dialog
          header="Usuarios"
          visible={this.state.visible}
          style={{ width: "400px" }}
          footer={this.footer}
          modal={true}
          onHide={() => this.setState({ visible: false })}
        >
          <FloatLabel>
            <InputText
              style={{ width: "100%" }}
              value={this.state.usuariosForm.iduser}
              id="iduser"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let usuariosForm = { ...prevState.usuariosForm };
                  usuariosForm.iduser = val;
                  return { usuariosForm };
                });
              }}
            />
            <label htmlFor="iduser">Id Usuario</label>
          </FloatLabel>
          <br />

          <FloatLabel>
            <InputText
              style={{ width: "100%" }}
              value={this.state.usuariosForm.nomuser}
              id="nombre"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let usuariosForm = { ...prevState.usuariosForm };
                  usuariosForm.nomuser = val;
                  return { usuariosForm };
                });
              }}
            />
            <label htmlFor="nombre">Nombres</label>
          </FloatLabel>
          <br />

          <FloatLabel>
            <InputText
              style={{ width: "100%" }}
              value={this.state.usuariosForm.apellido}
              id="apellido"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let usuariosForm = { ...prevState.usuariosForm };
                  usuariosForm.apellido = val;
                  return { usuariosForm };
                });
              }}
            />
            <label htmlFor="apellido">Apellidos</label>
          </FloatLabel>
          <br />

          <FloatLabel>
            <InputText
              style={{ width: "100%" }}
              value={this.state.usuariosForm.email}
              id="email"
              onChange={(e) => {
                let val = e.target.value;
                this.setState((prevState) => {
                  let usuariosForm = { ...prevState.usuariosForm };
                  usuariosForm.email = val;
                  return { usuariosForm };
                });
              }}
            />
            <label htmlFor="email">Email</label>
          </FloatLabel>
          <br />
        </Dialog>
        <Toast ref={this.Toast}/>
      </div>
    );
  }

  showSaveDialog() {
    this.setState({
      visible: true,
      usuariosForm: { iduser: null, nomuser: null, apellido: null, email: null },
    });
  }
  showEditDialog(){
    this.setState({
      visible: true,
      usuariosForm: { 
        iduser: this.state.selectedUsuarios.iduser, 
        nomuser: this.state.selectedUsuarios.nomuser, 
        apellido: this.state.selectedUsuarios.apellido, 
        email: this.state.selectedUsuarios.email 
      },
    });
  }
}
