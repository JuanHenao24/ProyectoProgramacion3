import {DefaultCrudRepository} from '@loopback/repository';
import {Amistad, AmistadRelations} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject} from '@loopback/core';

export class AmistadRepository extends DefaultCrudRepository<
  Amistad,
  typeof Amistad.prototype.id,
  AmistadRelations
> {
  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource,
  ) {
    super(Amistad, dataSource);
  }
}
