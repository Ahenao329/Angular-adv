import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { delay } from 'rxjs';
import { Hospital } from 'src/app/models/hospital.model';
import { Medico } from 'src/app/models/medico.model';
import { HospitalService } from 'src/app/services/hospital.service';
import { MedicoService } from 'src/app/services/medico.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-medico',
  templateUrl: './medico.component.html',
  styles: [
  ]
})
export class MedicoComponent implements OnInit {

  public medicoForm!: FormGroup ;
  public hospitales: Hospital[ ] = [];

  public hospitalSelecionado: Hospital | undefined;
  public medicoSelecionado: Medico | undefined;

  constructor( private fb: FormBuilder,
                private hospitalService: HospitalService,
                private medicoService: MedicoService,
                private router:  Router,
                private activatesRoute: ActivatedRoute,) { }

  ngOnInit(): void {

    this.activatesRoute.params
        .subscribe( ({ id }) => this.cargarMedico(id));


    this.medicoForm = this.fb.group({
      nombre: ['', Validators.required],
      hospital: ['', Validators.required],
    });

    

    this.cargarHospitales();

    this.medicoForm.get('hospital')?.valueChanges
        .subscribe( hospitalId => {
          this.hospitalSelecionado = this.hospitales.find( h => h._id == hospitalId);      
        })
  }

  guardarMedico() {
    const {nombre} = this.medicoForm.value;

    if ( this.medicoSelecionado){
      //actualizar
      const data = {
          ...this.medicoForm.value,
          _id: this.medicoSelecionado._id
      }
      this.medicoService.actualizarMedicos( data )
        .subscribe( resp => {
          console.log(resp);
          
          Swal.fire('Actualizado',`${ nombre } actualizado correctamente`, 'success');
        })
    } else {
      //crear
      this.medicoService.crearMedicos( this.medicoForm.value )
          .subscribe((resp: any) => {
            console.log(resp);
            Swal.fire('Creado',`${ nombre } creado correctamente`, 'success');
            this.router.navigateByUrl(`/dashboard/medico/${resp.medico._id}`)
          });  
    }

  }

  cargarMedico( id: string ){

    if ( id == 'nuevo' ){
      return;
    }

    this.medicoService.obtenerMedicoPorId(id)
      .pipe(
        delay(100)
      )
        .subscribe(medico => {

          if ( !medico ){
           return this.router.navigateByUrl(`/dashboard/medicos`)
          }
          const {nombre, hospital:{_id}} = medico      
          this.medicoSelecionado = medico;          
          this.medicoForm.setValue({ nombre, hospital: _id });  
          return;        
        });

  }

  cargarHospitales(){
    this.hospitalService.cargarHospitales()
        .subscribe((hospitales: any) => {
          this.hospitales = hospitales;          
        })
  }

}
