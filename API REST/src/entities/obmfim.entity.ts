import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Municipio } from "./municipio.entity";
import { OBMMeio } from "./obmmeio.entity";

@Index("UX_OBMFIM_SIGLA", ["sigla"], {
  unique: true,
})
@Entity("obmfim")
export class OBMFim {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column("varchar", { name: "nome" })
  public nome!: string;

  @Column("varchar", { name: "sigla", nullable: true })
  public sigla!: string;

  @Column("varchar", { name: "logradouro", nullable: true })
  public logradouro!: string;

  @Column("varchar", { name: "numero", nullable: true })
  public numero!: string;

  @Column("varchar", { name: "bairro", nullable: true })
  public bairro!: string;

  @Column("varchar", { name: "pop_area_op", nullable: true })
  public popAreaOp!: string;

  @Column("varchar", { name: "area_km2", nullable: true })
  public areaKM2!: string;

  @Column("varchar", { name: "densidade_demo_hab_km2", nullable: true })
  public densidadeDemoHabKM2!: string;

  @Column("varchar", { name: "municipio_id", nullable: true })
  public municipio_id!: string;

  @Index("FK_OBMMFIM_MUNICIPIO")
  @JoinColumn({ name: "municipio_id" })
  @ManyToOne(() => Municipio, { nullable: true })
  public municipio!: Municipio;

  @Column("varchar", { name: "cep", nullable: true })
  public CEP!: string;

  @Column("real", { name: "coordX", nullable: true })
  public coordX!: number;

  @Column("real", { name: "coordY", nullable: true })
  public coordY!: number;

  @Column("boolean", { name: "estaAtivo", default: true })
  public estaAtivo!: boolean;

  @Column("varchar", { name: "obmmeio_id" })
  public obmMeio_id!: string;

  @Index("FK_OBMFIM_OBMMEIO")
  @JoinColumn({ name: "obmmeio_id" })
  @ManyToOne(() => OBMMeio)
  public obmMeio!: OBMMeio;

  @Column({
    type: "timestamp with time zone",
    nullable: true,
    name: "data_criacao",
  })
  public dataCriacao!: Date;
}
