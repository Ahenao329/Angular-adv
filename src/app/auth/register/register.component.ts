import { Component} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2'
import { Router } from '@angular/router';

import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css' ]
})
export class RegisterComponent   {

  public formSubbmitted = false;

  public registerForms = this.fb.group({
    nombre: ['Anderson', Validators.required],
    email: ['ander@hotmail.com', [Validators.required, Validators.email],],
    password: ['123456', Validators.required],
    password2: ['123456', Validators.required],
    terminos: [true, Validators.required],

  },
  {
    validators: this.passwordsIguales('password', 'password2')
  });


  constructor(private fb: FormBuilder,
              private UsuarioService: UsuarioService,
              private router: Router,   ) { }


  crearUsuario(){
    this.formSubbmitted = true;
    console.log(this.registerForms.value);


    if (this.registerForms.invalid) {
      return;
    }

    //Realizar el posteo
    this.UsuarioService.crearUsuario(this.registerForms.value)
      .subscribe(resp => {
        this.router.navigateByUrl('/');
    
    }, (err)=>{  
      Swal.fire('Error', err.error.msg, 'error');
    });
    
    // if ( this.registerForms.valid ) {
    //   console.log('posteando formulario');
    // } else {
    //   console.log('Formulario no es correcto...');
    // }
    
  }

  campoNoValido(campo: string):boolean{
    if(this.registerForms.get(campo)?.invalid && this.formSubbmitted ){
      return true;
    } else {
      return false ;
    }
  }
  
  contrasenaNoValidas(){
    const pass1 = this.registerForms.get('password')?.value;
    const pass2 = this.registerForms.get('password2')?.value


    if ( (pass1 !== pass2) && this.formSubbmitted ) {
      return true;
    } else {
      return false;
    }

  }

  aceptarTerminos() {
    return !this.registerForms.get('terminos')?.value && this.formSubbmitted;
  }

  passwordsIguales(pass1Name: string, pass2Name: string ) {

    return (FormGroup: FormGroup) => {
      
      const pass1Control = FormGroup.get(pass1Name);
      const pass2Control = FormGroup.get(pass2Name);

      if ( pass1Control?.value == pass2Control?.value ){
      pass2Control?.setErrors(null)
    } else {
      pass2Control?.setErrors({ noEsigual: true})
    }

  }
}

}