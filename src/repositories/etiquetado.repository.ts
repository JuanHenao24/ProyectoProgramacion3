import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Etiquetado, EtiquetadoRelations, Publicaciones, Usuario} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PublicacionesRepository} from './publicaciones.repository';
import {UsuarioRepository} from './usuario.repository';

export class EtiquetadoRepository extends DefaultCrudRepository<
  Etiquetado,
  typeof Etiquetado.prototype.id,
  EtiquetadoRelations
> {

  public readonly publicaciones: BelongsToAccessor<Publicaciones, typeof Etiquetado.prototype.id>;

  public readonly usuario: BelongsToAccessor<Usuario, typeof Etiquetado.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PublicacionesRepository') protected publicacionesRepositoryGetter: Getter<PublicacionesRepository>, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Etiquetado, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
    this.publicaciones = this.createBelongsToAccessorFor('publicaciones', publicacionesRepositoryGetter,);
    this.registerInclusionResolver('publicaciones', this.publicaciones.inclusionResolver);
  }
}
