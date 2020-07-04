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
  Publicaciones,
  Comentario,
} from '../models';
import {PublicacionesRepository} from '../repositories';

export class PublicacionesComentarioController {
  constructor(
    @repository(PublicacionesRepository) protected publicacionesRepository: PublicacionesRepository,
  ) { }

  @get('/publicaciones/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Array of Publicaciones has many Comentario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Comentario)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Comentario>,
  ): Promise<Comentario[]> {
    return this.publicacionesRepository.comentarios(id).find(filter);
  }

  @post('/publicaciones/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Publicaciones model instance',
        content: {'application/json': {schema: getModelSchemaRef(Comentario)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Publicaciones.prototype.id_publicacion,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {
            title: 'NewComentarioInPublicaciones',
            exclude: ['id_comentario'],
            optional: ['publicacionesId']
          }),
        },
      },
    }) comentario: Omit<Comentario, 'id_comentario'>,
  ): Promise<Comentario> {
    return this.publicacionesRepository.comentarios(id).create(comentario);
  }

  @patch('/publicaciones/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Publicaciones.Comentario PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Comentario, {partial: true}),
        },
      },
    })
    comentario: Partial<Comentario>,
    @param.query.object('where', getWhereSchemaFor(Comentario)) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.publicacionesRepository.comentarios(id).patch(comentario, where);
  }

  @del('/publicaciones/{id}/comentarios', {
    responses: {
      '200': {
        description: 'Publicaciones.Comentario DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Comentario)) where?: Where<Comentario>,
  ): Promise<Count> {
    return this.publicacionesRepository.comentarios(id).delete(where);
  }
}
