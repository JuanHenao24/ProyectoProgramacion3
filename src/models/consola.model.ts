import {Entity, model, property} from '@loopback/repository';

@model()
export class Consola extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'string',
    required: true,
  })
  codigo: string;

  @property({
    type: 'string',
    required: true,
  })
  nombre: string;


  constructor(data?: Partial<Consola>) {
    super(data);
  }
}

export interface ConsolaRelations {
  // describe navigational properties here
}

export type ConsolaWithRelations = Consola & ConsolaRelations;
