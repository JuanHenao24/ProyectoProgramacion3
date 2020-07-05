import {Entity, model, property, belongsTo, hasMany} from '@loopback/repository';
import {Usuario} from './usuario.model';
import {Comentario} from './comentario.model';
import {Videojuego} from './videojuego.model';

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

  @property({
    type: 'string',
  })
  id_usuario?: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  @hasMany(() => Comentario)
  comentarios: Comentario[];

  @belongsTo(() => Videojuego)
  videojuegoId: string;

  constructor(data?: Partial<Publicaciones>) {
    super(data);
  }
}

export interface PublicacionesRelations {
  // describe navigational properties here
}

export type PublicacionesWithRelations = Publicaciones & PublicacionesRelations;
