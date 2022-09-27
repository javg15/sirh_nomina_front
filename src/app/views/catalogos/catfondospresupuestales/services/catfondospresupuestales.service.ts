import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

import { DataTablesResponse } from '../../../../classes/data-tables-response';

import { environment } from '../../../../../environments/environment';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};


@Injectable({
  providedIn: 'root'
})
export class CatfondospresupuestalesService {
  public API_URL = environment.APIS_URL;
  private modals: any[] = [];


  /* En el constructor creamos el objeto http de la clase HttpClient,
  que estará disponible en toda la clase del servicio.
  Se define como public, para que sea accesible desde los componentes necesarios */
  constructor(public http: HttpClient) { }

  getHeaders(): Observable<any> {
    return new Observable((o) => {
      setTimeout(() => {
        this.http.post<DataTablesResponse>(
          // this.API_URL + '/a6b_apis/read_records_dt.php',
          this.API_URL + '/catfondospresupuestales/getAdmin',
          { solocabeceras: 1, opcionesAdicionales: { raw: 0 } }, {}
        ).subscribe(resp => {
          o.next(resp.data[0]);
        })
      }, 200)
    })
  }
  /* El siguiente método lee los datos de un registro seleccionado para edición. */
  public getRecord(id: any): Observable<any> {
    return this.http.post(this.API_URL + '/catfondospresupuestales/getRecord',
      { id }
      , httpOptions);
  }
  public getQuincenaActiva(): Observable<any> {
    return this.http.post(this.API_URL + '/catfondospresupuestales/getQuincenaActiva',
      {  }
      , httpOptions);
  }


  /* El siguiente método graba un registro nuevo, o uno editado. */
  public setRecord(dataPack, actionForm): Observable<any> {

    return this.http.post(this.API_URL + '/catfondospresupuestales/setRecord',
      { dataPack, actionForm }
      , httpOptions);
  }

  public setUpdateFromWebService(id_semestre): Observable<any> {

    return this.http.post(this.API_URL + '/catfondospresupuestales/setUpdateFromWebService',
      { id_semestre }
      , httpOptions);
  }

  public getCatalogo(): Observable<any> {
    return this.http.post(this.API_URL + '/catfondospresupuestales/getCatalogo',
      {}
      , httpOptions);
  }

  public getCatalogoMayorActiva(): Observable<any> {
    return this.http.post(this.API_URL + '/catfondospresupuestales/getCatalogoMayorActiva',
      {}
      , httpOptions);
  }
  

  public getCatalogoSegunAnio(anio): Observable<any> {
    return this.http.post(this.API_URL + '/catfondospresupuestales/getCatalogoSegunAnio',
      { anio }
      , httpOptions);
  }

  public getCatalogoSegunSemestre(id_semestre): Observable<any> {
    return this.http.post(this.API_URL + '/catfondospresupuestales/getCatalogoSegunSemestre',
      { id_semestre }
      , httpOptions);
  }

  // array de modales
  public add(modal: any) {
    this.modals.push(modal);
  }

  public remove(id: string) {
    this.modals = this.modals.filter(x => x.id !== id);
  }

  public open(id: string, accion: string, idItem: number) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.open(idItem, accion);
  }

  public close(id: string) {
    let modal: any = this.modals.filter(x => x.id === id)[0];
    modal.close();
  }
}