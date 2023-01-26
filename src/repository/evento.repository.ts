import { BaseRepositoryController } from "./base.repository";
import { Injectable } from "@nestjs/common";
import { Evento } from "../entities/evento.entity";

@Injectable()
export class EventoRepository extends BaseRepositoryController(Evento) {}
