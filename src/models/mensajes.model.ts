import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Mensajes extends Entity {
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
  texto: string;

  @property({
    type: 'date',
    required: true,
  })
  fecha: string;

  @property({
    type: 'any',
  })
  hora?: any;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<Mensajes>) {
    super(data);
  }
}

export interface MensajesRelations {
  // describe navigational properties here
}

export type MensajesWithRelations = Mensajes & MensajesRelations;
