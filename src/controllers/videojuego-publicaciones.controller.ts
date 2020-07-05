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
  Publicaciones,
} from '../models';
import {VideojuegoRepository} from '../repositories';

export class VideojuegoPublicacionesController {
  constructor(
    @repository(VideojuegoRepository) protected videojuegoRepository: VideojuegoRepository,
  ) { }

  @get('/videojuegos/{id}/publicaciones', {
    responses: {
      '200': {
        description: 'Array of Videojuego has many Publicaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publicaciones)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Publicaciones>,
  ): Promise<Publicaciones[]> {
    return this.videojuegoRepository.publicaciones(id).find(filter);
  }

  @post('/videojuegos/{id}/publicaciones', {
    responses: {
      '200': {
        description: 'Videojuego model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publicaciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Videojuego.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicaciones, {
            title: 'NewPublicacionesInVideojuego',
            exclude: ['id_publicacion'],
            optional: ['videojuegoId']
          }),
        },
      },
    }) publicaciones: Omit<Publicaciones, 'id_publicacion'>,
  ): Promise<Publicaciones> {
    return this.videojuegoRepository.publicaciones(id).create(publicaciones);
  }

  @patch('/videojuegos/{id}/publicaciones', {
    responses: {
      '200': {
        description: 'Videojuego.Publicaciones PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicaciones, {partial: true}),
        },
      },
    })
    publicaciones: Partial<Publicaciones>,
    @param.query.object('where', getWhereSchemaFor(Publicaciones)) where?: Where<Publicaciones>,
  ): Promise<Count> {
    return this.videojuegoRepository.publicaciones(id).patch(publicaciones, where);
  }

  @del('/videojuegos/{id}/publicaciones', {
    responses: {
      '200': {
        description: 'Videojuego.Publicaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Publicaciones)) where?: Where<Publicaciones>,
  ): Promise<Count> {
    return this.videojuegoRepository.publicaciones(id).delete(where);
  }
}
