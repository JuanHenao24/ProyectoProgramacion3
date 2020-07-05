import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Videojuego,
  Categoria,
} from '../models';
import {VideojuegoRepository} from '../repositories';

export class VideojuegoCategoriaController {
  constructor(
    @repository(VideojuegoRepository) protected videojuegoRepository: VideojuegoRepository,
  ) { }

  @get('/videojuegos/{id}/categoria', {
    responses: {
      '200': {
        description: 'Videojuego has one Categoria',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Categoria),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Categoria>,
  ): Promise<Categoria> {
    return this.videojuegoRepository.categoria(id).get(filter);
  }

  @post('/videojuegos/{id}/categoria', {
    responses: {
      '200': {
        description: 'Videojuego model instance',
        content: {'application/json': {schema: getModelSchemaRef(Categoria)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Videojuego.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {
            title: 'NewCategoriaInVideojuego',
            exclude: ['id'],
            optional: ['videojuegoId']
          }),
        },
      },
    }) categoria: Omit<Categoria, 'id'>,
  ): Promise<Categoria> {
    return this.videojuegoRepository.categoria(id).create(categoria);
  }

  @patch('/videojuegos/{id}/categoria', {
    responses: {
      '200': {
        description: 'Videojuego.Categoria PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Categoria, {partial: true}),
        },
      },
    })
    categoria: Partial<Categoria>,
    @param.query.object('where', getWhereSchemaFor(Categoria)) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.videojuegoRepository.categoria(id).patch(categoria, where);
  }

  @del('/videojuegos/{id}/categoria', {
    responses: {
      '200': {
        description: 'Videojuego.Categoria DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Categoria)) where?: Where<Categoria>,
  ): Promise<Count> {
    return this.videojuegoRepository.categoria(id).delete(where);
  }
}
