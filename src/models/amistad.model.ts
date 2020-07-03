import {Entity, model, property} from '@loopback/repository';

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


  constructor(data?: Partial<Amistad>) {
    super(data);
  }
}

export interface AmistadRelations {
  // describe navigational properties here
}

export type AmistadWithRelations = Amistad & AmistadRelations;
