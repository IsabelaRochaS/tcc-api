import { BaseRepositoryController } from "./base.repository";
import { Injectable } from "@nestjs/common";
import { OBMFim } from "../entities/obmfim.entity";

@Injectable()
export class OBMFimRepository extends BaseRepositoryController(OBMFim) {}
