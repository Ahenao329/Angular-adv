import { HttpClient } from '@angular/common/http';
import { Injectable, NgZone } from '@angular/core';
import { catchError, map, tap } from 'rxjs/operators'
import { environment } from 'src/environments/environment';



import { registerForms } from '../interfaces/register-form.interface';
import { LoginForm } from '../interfaces/login-form.interface';
import { Observable, of } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

const base_url = environment.base_url;

// declare const gapi: any;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  [x: string]: any;

  public auth2: any;
  
  constructor(private http: HttpClient,
              private router: Router,
              private ngZone: NgZone) { 

                // this.googleInit();
  }

  // googleInit(){
    


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
    const token = localStorage.getItem('token') || '';

    return this.http.get(`${ base_url }/login/renew`, {
      headers: {
        'x-token': token
      }
    }).pipe(
      tap( (resp:any) => {
        localStorage.setItem('token',resp.token); 
      }),
      map(resp => true),
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

}
