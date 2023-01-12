import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  menu: any[] = [
    {
      titulo: 'Principal!!!',
      icono: 'mdi mdi-gauge',
      submenu: [
        { titulo: 'Main'},
        { titulo: 'ProgressBar', url: 'progress'},
        { titulo: 'Grafucas', url: 'grafica1'},

      ]
    }
    // ,{
    //   titulo: 'Principal!!!',
    //   icono: 'mdi mdi-gauge',
    //   submenu: [
    //     { titulo: 'Main'},
    //     { titulo: 'ProgressBar', url: 'progress'},
    //     { titulo: 'Grafucas', url: 'grafica1'},

    //   ]

    // }
  ];

  constructor() { }
}
