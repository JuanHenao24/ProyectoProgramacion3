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
  Usuario,
  Publicaciones,
} from '../models';
import {UsuarioRepository} from '../repositories';

export class UsuarioPublicacionesController {
  constructor(
    @repository(UsuarioRepository) protected usuarioRepository: UsuarioRepository,
  ) { }

  @get('/usuarios/{id}/publicaciones', {
    responses: {
      '200': {
        description: 'Array of Usuario has many Publicaciones',
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
    return this.usuarioRepository.publicaciones(id).find(filter);
  }

  @post('/usuarios/{id}/publicaciones', {
    responses: {
      '200': {
        description: 'Usuario model instance',
        content: {'application/json': {schema: getModelSchemaRef(Publicaciones)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Usuario.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Publicaciones, {
            title: 'NewPublicacionesInUsuario',
            exclude: ['id_publicacion'],
            optional: ['id_usuario']
          }),
        },
      },
    }) publicaciones: Omit<Publicaciones, 'id_publicacion'>,
  ): Promise<Publicaciones> {
    return this.usuarioRepository.publicaciones(id).create(publicaciones);
  }

  @patch('/usuarios/{id}/publicaciones', {
    responses: {
      '200': {
        description: 'Usuario.Publicaciones PATCH success count',
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
    return this.usuarioRepository.publicaciones(id).patch(publicaciones, where);
  }

  @del('/usuarios/{id}/publicaciones', {
    responses: {
      '200': {
        description: 'Usuario.Publicaciones DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Publicaciones)) where?: Where<Publicaciones>,
  ): Promise<Count> {
    return this.usuarioRepository.publicaciones(id).delete(where);
  }
}
