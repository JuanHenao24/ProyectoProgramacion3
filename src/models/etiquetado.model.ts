import {Entity, model, property} from '@loopback/repository';

@model()
export class Etiquetado extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;


  constructor(data?: Partial<Etiquetado>) {
    super(data);
  }
}

export interface EtiquetadoRelations {
  // describe navigational properties here
}

export type EtiquetadoWithRelations = Etiquetado & EtiquetadoRelations;
