import {Entity, model, property, hasMany} from '@loopback/repository';
import {Publicaciones} from './publicaciones.model';

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

  @hasMany(() => Publicaciones)
  publicaciones: Publicaciones[];

  constructor(data?: Partial<Videojuego>) {
    super(data);
  }
}

export interface VideojuegoRelations {
  // describe navigational properties here
}

export type VideojuegoWithRelations = Videojuego & VideojuegoRelations;
