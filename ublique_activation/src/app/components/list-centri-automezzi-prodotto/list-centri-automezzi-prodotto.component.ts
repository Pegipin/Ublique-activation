import { HttpClient } from "@angular/common/http";
import { Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatSidenav,
  MatTableDataSource,
  PageEvent,
} from "@angular/material";
import { Observable, pipe, Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { AddEditCentriAutomezziProdottoDialogComponent } from "src/app/dialogs/add-edit-centri-automezzi-prodotto-dialog/add-edit-centri-automezzi-prodotto-dialog.component";
import { LogisticCenterEntity } from "src/app/entity/Logistic_Center";
import {
  RainbowUbliqueActivationEntity,
  RainbowUbliqueActivationEntity_List,
} from "src/app/entity/Rainbow_Ublique_Activation.entity";
import { SocietaEntity } from "src/app/entity/Societa.entity";
import { EOTArtBaseEntity } from "src/app/entity/Tart_Base_entity";
import { ApiService } from "src/app/services/api.service";
import Swal, { SweetAlertResult } from "sweetalert2";


@Component({
  selector: "app-list-centri-automezzi-prodotto",
  templateUrl: "./list-centri-automezzi-prodotto.component.html",
  styleUrls: ["./list-centri-automezzi-prodotto.component.css"],
})
export class ListCentriAutomezziProdottoComponent implements OnInit {
  displayedColumns: string[] = [

    "logisticcenter",
    "baseproduct",
    'activated',
    "action",
    "demandplanningactive",
  ];

  dataSource: MatTableDataSource<RainbowUbliqueActivationEntity> =
    new MatTableDataSource<RainbowUbliqueActivationEntity>();
  listProducts: EOTArtBaseEntity[] = [];
  listLogistics: LogisticCenterEntity[] = [];
  productModel = new EOTArtBaseEntity();
  loadingList: boolean = false;
  pageNumber = 0;
  pageSize = 10;
  totalRecords: number;
  private _unsubscribeAll: Subject<any>;
  error: boolean;
  listSocieta: SocietaEntity[] = [];
  filteredListSocieta: SocietaEntity[] = [];
  filterSocieta: number = 0;
  filterlogistic: number;
  selectedLogisticCenter: number;

  constructor(public dialog: MatDialog, private _apiservice: ApiService) {
    this._unsubscribeAll = new Subject();
  }

  ngOnInit() {
    this._apiservice
      .ListRainbowUbliqueActivation(this.pageNumber + 1, this.pageSize)
      .subscribe((res: RainbowUbliqueActivationEntity_List) => {
        this.dataSource.data = res.ubliqueActivationList;
        this.totalRecords = res.totalRecords;

        this._apiservice
          .ListArtBase()
          .subscribe((products: EOTArtBaseEntity[]) => {
            this.listProducts = products;
          });

        this._apiservice
          .ListLogisticCenter()
          .subscribe((centers: LogisticCenterEntity[]) => {
            this.listLogistics = centers;
          });
      });
  }

  loadList() {
    this._apiservice
      .ListRainbowUbliqueActivation(this.pageNumber + 1, this.pageSize)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: RainbowUbliqueActivationEntity_List) => {
        if (!res) {
          this.dataSource.data = [];
          this.totalRecords = 0;
          return;
        }
        this.dataSource.data = res.ubliqueActivationList;
        this.totalRecords = res.totalRecords;
        console.log("res", res);
      });
  }


  onClickAddBU() {
    const dialogRef = this.dialog.open(
      AddEditCentriAutomezziProdottoDialogComponent,
      {
        width: "50vw",
      }
    );
    dialogRef.afterClosed().subscribe((res) => {
      this._apiservice
        .ListRainbowUbliqueActivation(this.pageNumber + 1, this.pageSize)
        .subscribe((res: RainbowUbliqueActivationEntity_List) => {
          this.dataSource.data = res.ubliqueActivationList;
        });
    });
  }

  onDelete(item: RainbowUbliqueActivationEntity) {
    Swal.fire({
      title: "Elimina Product " + this.getProductDescription(item.baseproduct),
      text:
        "Stai per eliminare " + this.getProductDescription(item.baseproduct),
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, eliminalo",
      cancelButtonText: "No, annulla eliminazione",
    }).then((result) => {
      if (result.value) {
        let entity: RainbowUbliqueActivationEntity =
          new RainbowUbliqueActivationEntity();

        entity.id;

        this._apiservice
          .DeleteRainbowUbliqueActivation(item.id)

          .subscribe((item: RainbowUbliqueActivationEntity) => {
            Swal.fire({
              title: "The product has been Deleted!",
              type: "success",
            });
            this._apiservice
              .ListRainbowUbliqueActivation(this.pageNumber + 1, this.pageSize)
              .subscribe((res: RainbowUbliqueActivationEntity_List) => {
                this.dataSource.data = res.ubliqueActivationList;
              });
          });
      }
    });
  }

  onPlay(item: RainbowUbliqueActivationEntity) {
    Swal.fire({
      title:
        "You are about to activate: " + item.logisticcenter + " / " + item.baseproduct,
      text:
        "You are about to activate: " + item.logisticcenter + " / " + item.baseproduct,
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, activate",
      cancelButtonText: "No, cancel",
    }).then((result) => {
      if (result.value) {
        item.demandplanningactive = true;

        this._apiservice
          .SetRainbowUbliqueActivation(item)
          .subscribe((item: RainbowUbliqueActivationEntity) => {
            Swal.fire({
              title: "The product has been Activated!",
              type: "success",
            });
            this._apiservice
              .ListRainbowUbliqueActivation(this.pageNumber + 1, this.pageSize)
              .subscribe((res: RainbowUbliqueActivationEntity_List) => {
                this.dataSource.data = res.ubliqueActivationList;
              });
          });
      }
    });
  }

  onStop(item: RainbowUbliqueActivationEntity) {
    Swal.fire({
      title:
        "You are about to block: " + item.logisticcenter + " / " + item.baseproduct,
      text:
        "You are about to block: " + item.logisticcenter + " / " + item.baseproduct,
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes,block ",
      cancelButtonText: "No, Cancel",
    }).then((result) => {
      if (result.value) {
        item.demandplanningactive = false;

        this._apiservice
          .SetRainbowUbliqueActivation(item)
          .subscribe((item: RainbowUbliqueActivationEntity) => {
            Swal.fire({
              title: "The product has been blocked!",
              type: "success",
            });
            this._apiservice
              .ListRainbowUbliqueActivation(this.pageNumber + 1, this.pageSize)
              .subscribe((res: RainbowUbliqueActivationEntity_List) => {
                this.dataSource.data = res.ubliqueActivationList;
              });
          });
      }
    });
  }

  getProductDescription(productCode: string) {
    const found = this.listProducts.find(
      (prod) => prod.artbase.art_base == productCode
    );
    return found
      ? found.artbase.art_base + " " + " " + found.artbase.breve
      : "";
  }

  getLogisticCenter(logisticCode: string) {
    const found = this.listLogistics.find((logic) => logic.CA == logisticCode);
    return found ? found.CA + " " + found.CABreve : "";
  }

  // applyFilter(filterValue: string){
  // this.dataSource.filter=filterValue.trim().toLowerCase();
  // }

  handlePaginatorEvent(event: PageEvent) {
    this.pageNumber = event.pageIndex;
    this.pageSize = event.pageSize;

    this.loadList();
  }

  ngOnDestroy() {
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }


}
