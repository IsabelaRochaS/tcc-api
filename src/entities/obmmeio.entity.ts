import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Municipio } from "./municipio.entity";

@Index("UX_OBMMEIO_SIGLA", ["sigla"], {
  unique: true,
})
@Entity("obmmeio")
export class OBMMeio {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column("varchar", { name: "nome" })
  public nome!: string;

  @Column("varchar", { name: "sigla" })
  public sigla!: string;

  @Column("varchar", { name: "logradouro" })
  public logradouro!: string;

  @Column("varchar", { name: "numero" })
  public numero!: string;

  @Column("varchar", { name: "bairro" })
  public bairro!: string;

  @Column("varchar", { name: "municipio_id" })
  public municipio_id!: string;

  @Index("FK_OBMMEIO_MUNICIPIO")
  @JoinColumn({ name: "municipio_id" })
  @ManyToOne(() => Municipio)
  public municipio!: Municipio;

  @Column("varchar", { name: "cep" })
  public CEP!: string;

  @Column("real", { name: "coordX" })
  public coordX!: number;

  @Column("real", { name: "coordY" })
  public coordY!: number;

  @Column("boolean", { name: "estaAtivo", default: true, nullable: true })
  public estaAtivo!: boolean;

  @Column({
    type: "timestamp with time zone",
    nullable: false,
    name: "data_criacao",
  })
  public dataCriacao!: Date;
}
