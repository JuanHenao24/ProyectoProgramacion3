import {DefaultCrudRepository} from '@loopback/repository';
import {ConsolaJuego, ConsolaJuegoRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class ConsolaJuegoRepository extends DefaultCrudRepository<
  ConsolaJuego,
  typeof ConsolaJuego.prototype.id,
  ConsolaJuegoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(ConsolaJuego, dataSource);
  }
}
