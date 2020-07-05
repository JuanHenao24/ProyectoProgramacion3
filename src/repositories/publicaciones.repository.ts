import {DefaultCrudRepository} from '@loopback/repository';
import {Publicaciones, PublicacionesRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class PublicacionesRepository extends DefaultCrudRepository<
  Publicaciones,
  typeof Publicaciones.prototype.id_publicacion,
  PublicacionesRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Publicaciones, dataSource);
  }
}
