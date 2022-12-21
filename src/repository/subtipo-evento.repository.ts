import { BaseRepositoryController } from "./base.repository";
import { Injectable } from "@nestjs/common";
import { SubtipoEvento } from "../entities/subtipoEvento.entity";

@Injectable()
export class SubtipoEventoRepository extends BaseRepositoryController(
  SubtipoEvento
) {}
