import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

export enum Mesoregiao {
  SUL_FLUMINENSE = "Sul Fluminense",
  NORTE_FLUMINENSE = "Norte Fluminense",
  NOROESTE_FLUMINENSE = "Noroeste Fluminense",
  CENTRO_FLUMINENSE = "Centro Fluminense",
  METROPOLITANA = "Metropolitana do Rio de Janeiro",
  BAIXADAS = "Baixadas",
}

@Index("UX_MUNICIPIO_NAME", ["nome"], {
  unique: true,
})
@Entity("municipio")
export class Municipio {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column("varchar", { name: "nome" })
  public nome!: string;

  @Column("varchar", { name: "populacao_estimada", nullable: true })
  public populacaoEstimada!: string;

  @Column("varchar", { name: "area_km2", nullable: true })
  public area!: string;

  @Column("varchar", { name: "densidade_populacional", nullable: true })
  public densidadePopulacional!: string;

  @Column("varchar", { name: "pib_per_capita", nullable: true })
  public pibPerCapita!: string;

  @Column("varchar", { name: "idhm", nullable: true })
  public idhm!: string;

  @Column("varchar", { name: "cod_ibge", nullable: true })
  public codIBGE!: string;

  @Column("enum", { name: "mesoregiao", enum: Mesoregiao })
  public mesoregiao!: Mesoregiao;
}
