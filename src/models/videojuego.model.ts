import {Entity, model, property} from '@loopback/repository';

@model()
export class Videojuego extends Entity {
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
  nombre: string;


  constructor(data?: Partial<Videojuego>) {
    super(data);
  }
}

export interface VideojuegoRelations {
  // describe navigational properties here
}

export type VideojuegoWithRelations = Videojuego & VideojuegoRelations;
