export class RainbowUbliqueActivationEntity {
  public id: number = 0;
  public logisticcenter:string;
  public baseproduct: string;
  public demandplanningactive: boolean=true;
  public insertdate:Date;
  public insertusername: string;
  public insertuserid: number;
  public updatedate:Date |string;
  public updateusername: string;
  public updateuserid: number;
  public deletedate:Date| string;
  public deleteusername: string;
  public deleteuserid: number;


}

export class RainbowUbliqueActivationEntity_List {
  public ubliqueActivationList: RainbowUbliqueActivationEntity[];
  public totalRecords: number = 0;
  public totalPages: number = 0;

}
