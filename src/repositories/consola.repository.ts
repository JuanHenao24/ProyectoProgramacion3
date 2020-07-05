import {DefaultCrudRepository} from '@loopback/repository';
import {Consola, ConsolaRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ConsolaRepository extends DefaultCrudRepository<
  Consola,
  typeof Consola.prototype.id,
  ConsolaRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Consola, dataSource);
  }
}
