import {Entity, model, property, hasMany, hasOne} from '@loopback/repository';
import {Oferta} from './oferta.model';
import {Categoria} from './categoria.model';

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

  @hasMany(() => Oferta)
  ofertas: Oferta[];

  @hasOne(() => Categoria)
  categoria: Categoria;

  constructor(data?: Partial<Videojuego>) {
    super(data);
  }
}

export interface VideojuegoRelations {
  // describe navigational properties here
}

export type VideojuegoWithRelations = Videojuego & VideojuegoRelations;
