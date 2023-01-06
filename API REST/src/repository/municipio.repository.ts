import { BaseRepositoryController } from "./base.repository";
import { Municipio } from "../entities/municipio.entity";
import { Injectable } from "@nestjs/common";

@Injectable()
export class MunicipioRepository extends BaseRepositoryController(Municipio) {}
