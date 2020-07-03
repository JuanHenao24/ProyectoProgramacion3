import {Entity, model, property} from '@loopback/repository';

@model()
export class Publicaciones extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id_publicacion?: string;

  @property({
    type: 'string',
  })
  fotos?: string;

  @property({
    type: 'string',
  })
  videos?: string;

  @property({
    type: 'string',
  })
  texto?: string;

  @property({
    type: 'any',
  })
  reacciones?: any;


  constructor(data?: Partial<Publicaciones>) {
    super(data);
  }
}

export interface PublicacionesRelations {
  // describe navigational properties here
}

export type PublicacionesWithRelations = Publicaciones & PublicacionesRelations;
