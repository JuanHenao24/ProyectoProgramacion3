import {DefaultCrudRepository} from '@loopback/repository';
import {Mensajes, MensajesRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class MensajesRepository extends DefaultCrudRepository<
  Mensajes,
  typeof Mensajes.prototype.id,
  MensajesRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Mensajes, dataSource);
  }
}
