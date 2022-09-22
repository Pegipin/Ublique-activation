export class TArtBaseEntity {
  public id: number = 0;
  public art_base: string;
  public descrizione: string;
  public breve: string;
  public um_stat: string;
  public um_plan: string;
  public tipo_gas: string;
  public tipo_analisi: string;
  public tipo_lotto: string;
  public codicestampa: string;
  public verifica_farmacista: number;
  public codice_lotto_set: string;
  public useautodemand: boolean = false;
  public usereportloxmedicale: boolean;
  public agg_base: string;
  public sync_id: number;
  public sync_dt: Date;
  public disabled: boolean = false;
  public usermodif: string;
  public gnlgas: number = 0;
}
export class EOTArtBaseEntity {
  public artbase: TArtBaseEntity;
  public TranslatedDescription: string;

}
