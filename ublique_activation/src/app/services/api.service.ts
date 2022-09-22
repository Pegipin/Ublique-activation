import { HttpClient } from '@angular/common/http';
import { Injectable, } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Context } from 'src/Service/DNN/context.service';
import { LogisticCenterEntity } from '../entity/Logistic_Center';
import { RainbowUbliqueActivationEntity, RainbowUbliqueActivationEntity_List } from '../entity/Rainbow_Ublique_Activation.entity';
import { SocietaEntity } from '../entity/Societa.entity';
import{EOTArtBaseEntity, TArtBaseEntity}from '../entity/Tart_Base_entity';

@Injectable({
  providedIn: 'root'
})
export class ApiService {


  private api_uri: string;
  private listRainbowUbliqueActivation: string = "RainbowUbliqueActivation/List";
  private listArtBase: string = "TArtBase/List";
  private listlogisticCenter:string="LogisticCenter/List "
  public setRainbowUbliqueActivation = "RainbowUbliqueActivation/Set ";
  public deleteRainbowUbliqueActivation = "RainbowUbliqueActivation/Delete ";
  private listLogisticaAttive = "fyre/listLogisticaaAttive";

  constructor(
    private context: Context,
    private httpClient: HttpClient,
    private snackbar: MatSnackBar
  ) {
    this.api_uri = this.context._properties.routingWebAPI;
  }


  ListRainbowUbliqueActivation(pageNumber: number, rowsPage: number): Observable<RainbowUbliqueActivationEntity_List> {
       return this.httpClient.get(
           `${this.api_uri}${this.listRainbowUbliqueActivation}?PageNumber=${pageNumber}&RowspPage=${rowsPage}`
         )
         .pipe(
           map((data: string) => {
             return JSON.parse(data) as RainbowUbliqueActivationEntity_List;
           }),
           catchError((err) => {
             return this.handleError(err);
           })
         );
     }


ListArtBase(): Observable<EOTArtBaseEntity[]> {
  return this.httpClient.get(
      `${this.api_uri}${this.listArtBase}`
    )
    .pipe(
      map((data: string) => {
        return JSON.parse(data) as EOTArtBaseEntity[];
      }),
      catchError((err) => {
        return this.handleError(err);
      })
    );
}

ListLogisticCenter(): Observable<LogisticCenterEntity[]> {
  return this.httpClient.get(
    `${this.api_uri}${this.listlogisticCenter}`
  )
  .pipe(
    map((data: string) => {
      return JSON.parse(data) as LogisticCenterEntity[];
    }),
    catchError((err) => {
      return this.handleError(err);
    })
  );

}








SetRainbowUbliqueActivation(entity: RainbowUbliqueActivationEntity): Observable<RainbowUbliqueActivationEntity> {

  let params: any;
  params = JSON.stringify(entity);
  return this.httpClient.post(`${this.api_uri}${this.setRainbowUbliqueActivation}`, params)

    .pipe(

      map((data: any) => {return JSON.parse(data) as RainbowUbliqueActivationEntity;

      }),

     catchError((err) => {
        return this.handleError(err);

      })

    );

}


DeleteRainbowUbliqueActivation(entity: number): Observable<RainbowUbliqueActivationEntity> {

  let params: any;
  params = JSON.stringify(entity);
  return this.httpClient.post(`${this.api_uri}${this.deleteRainbowUbliqueActivation}`, params)

    .pipe(

      map((data: any) => {return JSON.parse(data) as RainbowUbliqueActivationEntity;

      }),

     catchError((err) => {
        return this.handleError(err);

      })

    );

}



private handleError(err: any): Observable<any> {
  if (err.status !== 404) {
    this.openErrorSnackbar(err);
    return throwError(err);
  }
  else {
    return of<any>(null);
  }
}

private openErrorSnackbar(err) {
  if (err.status !== 404) {
    const errorMessage = err && err.message ? err.message : "Errors have occurred. Please try again later.";
    this.snackbar.open(errorMessage, null, { duration: 6000 });
  }
}


UserDelete(element) {
  let params: any;

  params = JSON.stringify(element);
  return this.httpClient.post<SocietaEntity>(`${this.api_uri}ARMUser/delete`, params)
  .pipe(
    map((data: any) => {
      return data;
    }),
    catchError(err => {
      if (err.status !== 404) {
        this.snackbar.open(err.error && err.error !== '' ? err.error : err.message, "", {duration: 10000});
      }
      return of(null);
    })
  );
}




}
