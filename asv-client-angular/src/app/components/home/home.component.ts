import { HttpClient } from '@angular/common/http';
import {Component, OnInit} from '@angular/core';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {debounceTime, map, startWith} from 'rxjs/operators';

class Municpio {
  constructor(public id: string ,public  nombre: string){}
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
 
  constructor(private http: HttpClient){}

  myControl = new FormControl();
  municipios: Municpio[] = [];
  filteredMunicipios: Observable<Municpio[]> | undefined;

  ngOnInit() {
    this.filteredMunicipios = this.myControl.valueChanges.pipe(
      startWith(''),
      debounceTime(800),
      map(value => this.getMunicipios(value)),
    );
  }

  private getMunicipios(prefijo: string): Municpio[] {
  this.http.get<Municpio[]>('http://localhost:3000/municipios?prefMpio='+prefijo)
  .subscribe(value => { this.municipios=value; });
    return this.municipios;
  }
}
