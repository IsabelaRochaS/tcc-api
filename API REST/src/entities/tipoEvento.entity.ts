import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("tipoEvento")
export class TipoEvento {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column("varchar", { name: "tipo" })
  public tipo!: string;

  @Column("varchar", { name: "tipo_codigo" })
  public tipoCodigo!: string;
}
