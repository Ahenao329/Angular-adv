import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: [
  ]
})
export class PromesasComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {

    this.getUsuarios().then(usuarios => {
      console.log(usuarios);
      
    })

  //   const promesa = new Promise( (resolver, noresolver) =>{

  //     if (false) {
  //       resolver('Hola mundo');
  //     } else {
  //       noresolver('Algo salio mal');
  //     }
      
  //   });

  //   promesa.then((mensaje) => {
  //       console.log(mensaje);
        
  //   })
  //   .catch( error => console.log('Error en mi promesa', error));
    
  //   console.log('fin del Init');
    
  }

  // getUsuarios() {
  //   fetch('http://reqres.in/api/users')
  //   .then(resp => {
  //     resp.json().then(body => console.log(body))
  //   });
  // }

  // getUsuarios() {
  //   fetch('http://reqres.in/api/users')
  //   .then(resp => { resp.json() })
  //   .then(body => console.log(body));
  // }

  getUsuarios() {

    return new Promise(resolver =>{
      
    fetch('http://reqres.in/api/users')
    .then(resp => resp.json() )
    .then(body => resolver(body.data));

    });


  }


}
