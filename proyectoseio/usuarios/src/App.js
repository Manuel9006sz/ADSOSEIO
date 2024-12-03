import './App.css';
import "primereact/resources/themes/lara-dark-teal/theme.css";
import 'primeicons/primeicons.css';

import { Menubar } from 'primereact/menubar';      
import { UsuariosService } from './services/UsuariosService';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Component } from 'react';
import { Panel } from 'primereact/panel';
import React from 'react';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { FloatLabel } from 'primereact/floatlabel';
        
        
        
        
export default class app extends Component{
  constructor(){
    super();
    this.state = {};
    this.items=[
      {
        label:"Nuevo",
        icon: "pi pi-fw pi user-plus",
        command:  ()=>{this.showSaveDialog()}
      },
      {
        label:"Editar",
        icon: "pi pi-fw pi user-edit",
        command:  ()=>{alert("Edited!")}
      },
      {
        label:"Eliminar",
        icon: "pi pi-fw pi user-minus",
        command:  ()=>{alert("Deleted!")}
      }
    ];
    this.usuariosService = new UsuariosService();
  }

  componentDidMount(){
    this.usuariosService.getAll().then(data => this.setState({usuarios: data}))
    this.setState({
      visible:false,
      usuarios:{
        iduser:null,
        nombre:null,
        apellido:null,
        email:null
      }
    });

  }

  render(){
    return(
  <div style={{width:'80%', margin:'20px auto 0px'}}>
    <Menubar model={this.items} />
    <br/>
   <Panel header = "Gestion de Usuarios" >
    <DataTable value={this.state.usuarios}>
      <Column field='iduser' header="ID"></Column>
      <Column field='nomuser' header="Nombres"></Column>
      <Column field='apellido' header="Apellidos"></Column>
      <Column field='email' header="Email"></Column>
    </DataTable>
   </Panel>

   <Dialog header="usuarios" visible={this.state.visible} style={{ width: '400px' }} modal={true} onHide={() => this.setState({visible:false})}>

   <FloatLabel>
   <InputText style={{width:"100%"}} value={this.state.value} id= 'iduser'onChange={(e) => this.setState(prevState =>{
    let usuarios=Object.assign({}, prevState.usuarios);
    usuarios.iduser= e.target.value
    return {usuarios};
   })} />
   <label for="iduser">Id Usuario</label>

   </FloatLabel>
   </Dialog>
   </div>

    );
  }
  showSaveDialog(){
    this.setState({
      visible:true
    });
  }
}