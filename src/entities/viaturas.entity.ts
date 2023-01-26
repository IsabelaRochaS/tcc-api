import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

export enum SiglaViatura {
  ABC = "ABC",
}

export enum FinalidadeViatura {
  ABC = "ABC",
}

@Entity("viaturas")
export class Viaturas {
  @PrimaryGeneratedColumn("uuid", { name: "id" })
  public id!: string;

  @Column("varchar", { name: "nome" })
  public nome!: string;

  @Column("enum", { name: "sigla", enum: SiglaViatura })
  public sigla!: SiglaViatura;

  @Column("enum", { name: "finalidade", enum: FinalidadeViatura })
  public finalidade!: FinalidadeViatura;
}
