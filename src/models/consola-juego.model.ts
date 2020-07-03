import {Entity, model, property} from '@loopback/repository';

@model()
export class ConsolaJuego extends Entity {

  constructor(data?: Partial<ConsolaJuego>) {
    super(data);
  }
}

export interface ConsolaJuegoRelations {
  // describe navigational properties here
}

export type ConsolaJuegoWithRelations = ConsolaJuego & ConsolaJuegoRelations;
