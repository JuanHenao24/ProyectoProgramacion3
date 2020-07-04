import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Publicaciones,
  Usuario,
} from '../models';
import {PublicacionesRepository} from '../repositories';

export class PublicacionesUsuarioController {
  constructor(
    @repository(PublicacionesRepository)
    public publicacionesRepository: PublicacionesRepository,
  ) { }

  @get('/publicaciones/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Publicaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Publicaciones.prototype.id_publicacion,
  ): Promise<Usuario> {
    return this.publicacionesRepository.usuario(id);
  }
}
