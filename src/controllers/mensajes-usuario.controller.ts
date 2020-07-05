import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Mensajes,
  Usuario,
} from '../models';
import {MensajesRepository} from '../repositories';

export class MensajesUsuarioController {
  constructor(
    @repository(MensajesRepository)
    public mensajesRepository: MensajesRepository,
  ) { }

  @get('/mensajes/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Mensajes',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Mensajes.prototype.id,
  ): Promise<Usuario> {
    return this.mensajesRepository.usuario(id);
  }
}
