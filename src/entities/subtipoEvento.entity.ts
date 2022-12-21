import {
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { TipoEvento } from "./tipoEvento.entity";

@Entity("subtipoEvento")
export class SubtipoEvento {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column("varchar", { name: "subtipo" })
  public subtipo!: string;

  @Column("varchar", { name: "tipoEvento_id", nullable: true })
  public tipoEvento_id!: string;

  @Index("FK_TIPOEVENTO_SUBTIPOEVENTO")
  @JoinColumn({ name: "tipoEvento_id" })
  @ManyToOne(() => TipoEvento, { nullable: true })
  public tipoEvento!: TipoEvento;
}
