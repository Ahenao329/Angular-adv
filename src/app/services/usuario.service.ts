import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

import { Observable, of } from 'rxjs';
import { catchError, delay, map, tap } from 'rxjs/operators'

import { environment } from 'src/environments/environment';


import { registerForms } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { cargarUsuario } from '../interfaces/cargar-usuarios.interface';

import { Usuario } from '../models/usuario.model';

declare const google: any;

const base_url = environment.base_url;

// declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  [x: string]: any;

  public auth2: any;
  public usuario!: Usuario;
  
  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) { 

                // this.googleInit();
  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get uid():string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

//   googleInit(){
    


//   return new Promise<void>( resolve => {
//     gapi.load('auth2', () => {
//       this.auth2 = gapi.auth2.init({
//         client_id: '330372155354-nb985lqmt5g92tkk858s0gd92nq7lljr.apps.googleusercontent.com',
//         cookiepolicy: 'single_host_origin',
//       })
//       resolve();
      
//     });
//   })

// }



  logout() {
    
    const email=localStorage.getItem('email')|| '';
    google.accounts.id.revoke(email,()=> {
      this.ngZone.run(()=>{
        this.router.navigateByUrl('/login');
      });
      localStorage.removeItem('token');
      localStorage.removeItem('email');
    });
  }

  validarToken(): Observable<boolean> {

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map( (resp:any) => {
        console.log(resp);
        const { nombre, email, google, img = '', role, uid } = resp.usuario;        
        this.usuario = new Usuario( nombre, email, '', img, google, role, uid  );
        localStorage.setItem('token',resp.token); 
        return true;
      }),
      catchError( error => of(false) )
    );
  }

  crearUsuario(formData: registerForms){

    return this.http.post(`${ base_url }/usuarios`, formData )
                      .pipe(
                        tap( (resp:any) => {
                          localStorage.setItem('token', resp.token)
                        })
                      );
    
  }

  actualizarPerfil( data: { email: string, nombre: string, role: string } ) {

    data = {
      ...data,
      role: this.usuario.role || ''
    };

   return this.http.put(`${ base_url }/usuarios/${ this.uid }`, data, this.headers)

  }

  login(formData: any){

    return this.http.post(`${ base_url }/login`, formData )
                      .pipe(
                        tap( (resp:any) => {
                          localStorage.setItem('token', resp.token)
                        })
                      );
    
  }


  loginGoogle(token: string) {
    return this.http.post(`${ base_url }/login/google`, {token} )
    .pipe(
      tap( (resp: any) => {
        // console.log(resp)
        localStorage.setItem('token', resp.token)
        localStorage.setItem('email',resp.email)

      })
    )
  }

  cargarUsuarios( desde: number = 0) {
    const url = `${base_url}/usuarios?desde=${desde}`;
      return this.http.get<cargarUsuario>(url, this.headers)
        .pipe(
          // delay(5000),
          map(resp => {
            const usuarios = resp.usuarios.map( 
              user => new Usuario( user.nombre, user.email, '', user.img, user.google, user.role, user.uid )
              );
            return {
              total: resp.total,
              usuarios
            };
          })
        )
  }

  eliminarUsuario( usuario:Usuario) {
    const url = `${base_url}/usuarios/
    ${ usuario.uid }`;
      return this.http.delete(url, this.headers);
    
  }

  guardarUsuario( usuario: Usuario ) {

   return this.http.put(`${ base_url }/usuarios/${ usuario.uid }`, usuario, this.headers)

  }

}
