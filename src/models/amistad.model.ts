import {Entity, model, property, belongsTo} from '@loopback/repository';
import {Usuario} from './usuario.model';

@model()
export class Amistad extends Entity {
  @property({
    type: 'string',
    id: true,
    generated: true,
  })
  id?: string;

  @property({
    type: 'date',
    required: true,
  })
  fechaAmistad: string;

  @property({
    type: 'string',
    required: true,
  })
  estado: string;

  @belongsTo(() => Usuario)
  usuarioId: string;

  constructor(data?: Partial<Amistad>) {
    super(data);
  }
}

export interface AmistadRelations {
  // describe navigational properties here
}

export type AmistadWithRelations = Amistad & AmistadRelations;
