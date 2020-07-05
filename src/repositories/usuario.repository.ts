import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Usuario, UsuarioRelations, Publicaciones} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PublicacionesRepository} from './publicaciones.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly publicaciones: HasManyRepositoryFactory<Publicaciones, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PublicacionesRepository') protected publicacionesRepositoryGetter: Getter<PublicacionesRepository>,
  ) {
    super(Usuario, dataSource);
    this.publicaciones = this.createHasManyRepositoryFactoryFor('publicaciones', publicacionesRepositoryGetter,);
    this.registerInclusionResolver('publicaciones', this.publicaciones.inclusionResolver);
  }
}
