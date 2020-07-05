import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Comentario, ComentarioRelations, Publicaciones} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PublicacionesRepository} from './publicaciones.repository';

export class ComentarioRepository extends DefaultCrudRepository<
  Comentario,
  typeof Comentario.prototype.id_comentario,
  ComentarioRelations
> {

  public readonly publicaciones: BelongsToAccessor<Publicaciones, typeof Comentario.prototype.id_comentario>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PublicacionesRepository') protected publicacionesRepositoryGetter: Getter<PublicacionesRepository>,
  ) {
    super(Comentario, dataSource);
    this.publicaciones = this.createBelongsToAccessorFor('publicaciones', publicacionesRepositoryGetter,);
    this.registerInclusionResolver('publicaciones', this.publicaciones.inclusionResolver);
  }
}
