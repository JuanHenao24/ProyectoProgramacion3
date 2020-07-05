import {DefaultCrudRepository, repository, BelongsToAccessor, HasManyRepositoryFactory} from '@loopback/repository';
import {Publicaciones, PublicacionesRelations, Usuario, Comentario, Videojuego} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';
import {ComentarioRepository} from './comentario.repository';
import {VideojuegoRepository} from './videojuego.repository';

export class PublicacionesRepository extends DefaultCrudRepository<
  Publicaciones,
  typeof Publicaciones.prototype.id_publicacion,
  PublicacionesRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Publicaciones.prototype.id_publicacion>;

  public readonly comentarios: HasManyRepositoryFactory<Comentario, typeof Publicaciones.prototype.id_publicacion>;

  public readonly videojuego: BelongsToAccessor<Videojuego, typeof Publicaciones.prototype.id_publicacion>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>, @repository.getter('ComentarioRepository') protected comentarioRepositoryGetter: Getter<ComentarioRepository>, @repository.getter('VideojuegoRepository') protected videojuegoRepositoryGetter: Getter<VideojuegoRepository>,
  ) {
    super(Publicaciones, dataSource);
    this.videojuego = this.createBelongsToAccessorFor('videojuego', videojuegoRepositoryGetter,);
    this.registerInclusionResolver('videojuego', this.videojuego.inclusionResolver);
    this.comentarios = this.createHasManyRepositoryFactoryFor('comentarios', comentarioRepositoryGetter,);
    this.registerInclusionResolver('comentarios', this.comentarios.inclusionResolver);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
