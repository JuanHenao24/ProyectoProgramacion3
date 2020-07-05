import {DefaultCrudRepository} from '@loopback/repository';
import {Oferta, OfertaRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class OfertaRepository extends DefaultCrudRepository<
  Oferta,
  typeof Oferta.prototype.id,
  OfertaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Oferta, dataSource);
  }
}
