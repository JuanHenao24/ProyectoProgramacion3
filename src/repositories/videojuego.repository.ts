import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Videojuego, VideojuegoRelations, Publicaciones} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PublicacionesRepository} from './publicaciones.repository';

export class VideojuegoRepository extends DefaultCrudRepository<
  Videojuego,
  typeof Videojuego.prototype.id,
  VideojuegoRelations
> {

  public readonly publicaciones: HasManyRepositoryFactory<Publicaciones, typeof Videojuego.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PublicacionesRepository') protected publicacionesRepositoryGetter: Getter<PublicacionesRepository>,
  ) {
    super(Videojuego, dataSource);
    this.publicaciones = this.createHasManyRepositoryFactoryFor('publicaciones', publicacionesRepositoryGetter,);
    this.registerInclusionResolver('publicaciones', this.publicaciones.inclusionResolver);
  }
}
