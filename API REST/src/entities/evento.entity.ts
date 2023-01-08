import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TipoEvento } from "./tipoEvento.entity";
import { SubtipoEvento } from "./subtipoEvento.entity";
import { Municipio } from "./municipio.entity";

@Entity("evento")
export class Evento {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column({ name: "id_evento" })
  public idEvento!: string;

  @Column("varchar", { name: "ocorrencia", nullable: true })
  public ocorrencia?: string;

  @Column({
    type: "timestamp with time zone",
    nullable: true,
    name: "data_criacao",
  })
  public dataCriacao?: Date;

  @Column("varchar", { name: "agencia", nullable: true })
  public agencia?: string;

  @Column("varchar", { name: "operacao", nullable: true })
  public operacao?: string;

  @Column("varchar", { name: "cba", nullable: true })
  public cba?: string;

  @Column("varchar", { name: "grupamento", nullable: true })
  public grupamento?: string;

  @Column("varchar", { name: "grupamentoCodigo", nullable: true })
  public grupamentoCodigo?: string;

  @Column("varchar", { name: "tipoEvento_id", nullable: true })
  public tipoEvento_id!: string;

  @Index("FK_EVENTO_TIPOEVENTO")
  @JoinColumn({ name: "tipoEvento_id" })
  @ManyToOne(() => TipoEvento, { nullable: true })
  public tipoEvento!: TipoEvento;

  @Column("varchar", { name: "subtipoEvento_id", nullable: true })
  public subtipoEvento_id!: string;

  @Index("FK_EVENTO_SUBTIPOEVENTO")
  @JoinColumn({ name: "subtipoEvento_id" })
  @ManyToOne(() => SubtipoEvento, { nullable: true })
  public subtipoEvento!: SubtipoEvento;

  @Column("varchar", { name: "categoria", nullable: true })
  public categoria?: string;

  @Column("varchar", { name: "situacao", nullable: true })
  public situacao?: string;

  @Column({
    type: "timestamp with time zone",
    nullable: true,
    name: "data_despacho",
  })
  public dataDespacho?: Date;

  @Column({
    type: "timestamp with time zone",
    nullable: true,
    name: "data_deslocamento",
  })
  public dataDeslocamento?: Date;

  @Column({
    type: "timestamp with time zone",
    nullable: true,
    name: "data_chegadaEvento",
  })
  public dataChegadaEvento?: Date;

  @Column({
    type: "timestamp with time zone",
    nullable: true,
    name: "data_fechamento",
  })
  public dataFechamento?: Date;

  @Column("varchar", { name: "municipio_id", nullable: true })
  public municipio_id!: string;

  @Index("FK_EVENTO_MUNICIPIO")
  @JoinColumn({ name: "municipio_id" })
  @ManyToOne(() => Municipio, { nullable: true })
  public municipio!: Municipio;
}
