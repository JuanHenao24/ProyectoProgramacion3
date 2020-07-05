import {DefaultCrudRepository, repository, BelongsToAccessor} from '@loopback/repository';
import {Mensajes, MensajesRelations, Usuario} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {UsuarioRepository} from './usuario.repository';

export class MensajesRepository extends DefaultCrudRepository<
  Mensajes,
  typeof Mensajes.prototype.id,
  MensajesRelations
> {

  public readonly usuario: BelongsToAccessor<Usuario, typeof Mensajes.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('UsuarioRepository') protected usuarioRepositoryGetter: Getter<UsuarioRepository>,
  ) {
    super(Mensajes, dataSource);
    this.usuario = this.createBelongsToAccessorFor('usuario', usuarioRepositoryGetter,);
    this.registerInclusionResolver('usuario', this.usuario.inclusionResolver);
  }
}
