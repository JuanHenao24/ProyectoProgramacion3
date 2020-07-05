import {Entity, model, property} from '@loopback/repository';

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
    type: 'string',
    required: true,
  })
  idUsuario1: string;

  @property({
    type: 'string',
    required: true,
  })
  idUsuario2: string;


  constructor(data?: Partial<Mensajes>) {
    super(data);
  }
}

export interface MensajesRelations {
  // describe navigational properties here
}

export type MensajesWithRelations = Mensajes & MensajesRelations;
