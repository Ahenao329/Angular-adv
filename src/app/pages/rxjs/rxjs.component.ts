import { Component, OnDestroy, OnInit } from '@angular/core';
import { filter, interval, map, Observable, retry, Subscription, take } from 'rxjs';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: [
  ]
})
export class RxjsComponent implements OnDestroy {

  public intervalSubs: Subscription;
  constructor() {
    
   

    // this.retornaObservables().pipe(
    //   retry(2)
    // ).subscribe(
    //   valor => console.log('Subs', valor),
    //   error => console.warn('Error', error),
    //   () => console.info('Obs terminado')
    //  );

    // this.retornaIntervalo()
    // .subscribe(console.log)
    // .subscribe((valor) => console.log(valor))


    this.intervalSubs = this.retornaIntervalo().subscribe( console.log )
   } 

  ngOnDestroy(): void {
    this.intervalSubs.unsubscribe();
  }

   retornaIntervalo(): Observable<number> {

    return interval(1000)
                        .pipe(
                          // take(10),
                          map( valor => valor +1),
                          filter( valor => (valor % 2 == 0)? true : false ),
                        );

   }

  retornaObservables(): Observable<number> {
    let i = -1;
    const obs$ = new Observable<number>( observar => {

      // return mew setInterval( () => {

      const intervalo = setInterval( () => {

        i++
        observar.next(i);

        if (i == 4) {
          clearInterval( intervalo );
          observar.complete();
        }

        if(i == 2) {
          observar.error(('i llego al valor de 2'))
        }

      }, 1000)

    });

    return obs$;

  }



  
} 
