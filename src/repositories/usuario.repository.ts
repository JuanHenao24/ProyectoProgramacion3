import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {Usuario, UsuarioRelations, Publicaciones, Amistad, Mensajes} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {PublicacionesRepository} from './publicaciones.repository';
import {AmistadRepository} from './amistad.repository';
import {MensajesRepository} from './mensajes.repository';

export class UsuarioRepository extends DefaultCrudRepository<
  Usuario,
  typeof Usuario.prototype.id,
  UsuarioRelations
> {

  public readonly publicaciones: HasManyRepositoryFactory<Publicaciones, typeof Usuario.prototype.id>;

  public readonly amistad: HasManyRepositoryFactory<Amistad, typeof Usuario.prototype.id>;

  public readonly mensajes: HasManyRepositoryFactory<Mensajes, typeof Usuario.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('PublicacionesRepository') protected publicacionesRepositoryGetter: Getter<PublicacionesRepository>, @repository.getter('AmistadRepository') protected amistadRepositoryGetter: Getter<AmistadRepository>, @repository.getter('MensajesRepository') protected mensajesRepositoryGetter: Getter<MensajesRepository>,
  ) {
    super(Usuario, dataSource);
    this.mensajes = this.createHasManyRepositoryFactoryFor('mensajes', mensajesRepositoryGetter,);
    this.registerInclusionResolver('mensajes', this.mensajes.inclusionResolver);
    this.amistad = this.createHasManyRepositoryFactoryFor('amistad', amistadRepositoryGetter,);
    this.registerInclusionResolver('amistad', this.amistad.inclusionResolver);
    this.publicaciones = this.createHasManyRepositoryFactoryFor('publicaciones', publicacionesRepositoryGetter,);
    this.registerInclusionResolver('publicaciones', this.publicaciones.inclusionResolver);
  }
}
