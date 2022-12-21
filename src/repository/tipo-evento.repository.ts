import { BaseRepositoryController } from "./base.repository";
import { Injectable } from "@nestjs/common";
import { TipoEvento } from "../entities/tipoEvento.entity";

@Injectable()
export class TipoEventoRepository extends BaseRepositoryController(
  TipoEvento
) {}
