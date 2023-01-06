import { BaseRepositoryController } from "./base.repository";
import { Injectable } from "@nestjs/common";
import { OBMMeio } from "../entities/obmmeio.entity";

@Injectable()
export class OBMMeioRepository extends BaseRepositoryController(OBMMeio) {}
