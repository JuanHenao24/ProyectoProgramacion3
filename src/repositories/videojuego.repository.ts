import {DefaultCrudRepository} from '@loopback/repository';
import {Videojuego, VideojuegoRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class VideojuegoRepository extends DefaultCrudRepository<
  Videojuego,
  typeof Videojuego.prototype.id,
  VideojuegoRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Videojuego, dataSource);
  }
}
