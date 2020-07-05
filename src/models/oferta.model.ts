import {Entity, model, property} from '@loopback/repository';

@model()
export class Oferta extends Entity {
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
  descripcion: string;

  @property({
    type: 'string',
    required: true,
  })
  enlaceTienda: string;


  constructor(data?: Partial<Oferta>) {
    super(data);
  }
}

export interface OfertaRelations {
  // describe navigational properties here
}

export type OfertaWithRelations = Oferta & OfertaRelations;
