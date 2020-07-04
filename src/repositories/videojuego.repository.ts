import {DefaultCrudRepository, repository, HasManyRepositoryFactory, HasOneRepositoryFactory} from '@loopback/repository';
import {Videojuego, VideojuegoRelations, Oferta, Categoria} from '../models';
import {MongodbDataSource} from '../datasources';
import {inject, Getter} from '@loopback/core';
import {OfertaRepository} from './oferta.repository';
import {CategoriaRepository} from './categoria.repository';

export class VideojuegoRepository extends DefaultCrudRepository<
  Videojuego,
  typeof Videojuego.prototype.id,
  VideojuegoRelations
> {

  public readonly ofertas: HasManyRepositoryFactory<Oferta, typeof Videojuego.prototype.id>;

  public readonly categoria: HasOneRepositoryFactory<Categoria, typeof Videojuego.prototype.id>;

  constructor(
    @inject('datasources.mongodb') dataSource: MongodbDataSource, @repository.getter('OfertaRepository') protected ofertaRepositoryGetter: Getter<OfertaRepository>, @repository.getter('CategoriaRepository') protected categoriaRepositoryGetter: Getter<CategoriaRepository>,
  ) {
    super(Videojuego, dataSource);
    this.categoria = this.createHasOneRepositoryFactoryFor('categoria', categoriaRepositoryGetter);
    this.registerInclusionResolver('categoria', this.categoria.inclusionResolver);
    this.ofertas = this.createHasManyRepositoryFactoryFor('ofertas', ofertaRepositoryGetter,);
    this.registerInclusionResolver('ofertas', this.ofertas.inclusionResolver);
  }
}
