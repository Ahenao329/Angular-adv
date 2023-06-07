import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu: any = [] ;


  cargarMenu() {
    this.menu = JSON.parse(localStorage.getItem('menu') || '') || [];

  }

  // menu: any[] = [
  //   {
  //     titulo: 'Principal!!!',
  //     icono: 'mdi mdi-gauge',
  //     submenu: [
  //       { titulo: 'Main'},
  //       { titulo: 'Grafucas', url: 'grafica1'},
  //       { titulo: 'Promesas', url: 'promesas'},
  //       { titulo: 'ProgressBar', url: 'progress'},
  //       { titulo: 'rxjs', url: 'rxjs'},
  //     ]
  //   },
  //   {
  //     titulo: 'Mantenimiento',
  //     icono: 'mdi mdi-folder-lock-open',
  //     submenu: [
  //       { titulo: 'Usuarios', url: 'usuarios'},
  //       { titulo: 'Hospitales', url: 'hospitales'},
  //       { titulo: 'Medicos', url: 'medicos'},
  //     ]
  //   }

  // ];


  constructor() { }
}
