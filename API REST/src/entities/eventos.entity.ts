import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("eventos")
export class Eventos {
  @PrimaryGeneratedColumn({ name: "id" })
  public idEvento!: string;

  @Column("varchar", { name: "ocorrencia" })
  public ocorrencia!: string;

  @Column({
    type: "timestamp with time zone",
    nullable: false,
    name: "data_criacao",
  })
  public dataCriacao!: Date;
}
