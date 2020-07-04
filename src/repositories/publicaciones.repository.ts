import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Publicaciones, PublicacionesRelations, Usuario, Comentario} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';
import {ComentarioRepository} from './comentario.repository';

export class PublicacionesRepository extends DefaultCrudRepository<
  Publicaciones,
  typeof Publicaciones.prototype.id_publicacion,
  PublicacionesRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Publicaciones.prototype.id_publicacion>;

  public readonly comentarios: HasManyRepositoryFactory<Comentario, typeof Publicaciones.prototype.id_publicacion>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>,
  ) {
    super(Publicaciones, dataSource);
    this.comentarios = this.createHasManyRepositoryFactoryFor('comentarios', comentarioRepositoryGetter,);
    this.registerInclusionResolver('comentarios', this.comentarios.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
