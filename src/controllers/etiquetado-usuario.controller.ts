import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Etiquetado,
  Usuario,
} from '../models';
import {EtiquetadoRepository} from '../repositories';

export class EtiquetadoUsuarioController {
  constructor(
    @repository(EtiquetadoRepository)
    public etiquetadoRepository: EtiquetadoRepository,
  ) { }

  @get('/etiquetados/{id}/usuario', {
    responses: {
      '200': {
        description: 'Usuario belonging to Etiquetado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Usuario)},
          },
        },
      },
    },
  })
  async getUsuario(
    @param.path.string('id') id: typeof Etiquetado.prototype.id,
  ): Promise<Usuario> {
    return this.etiquetadoRepository.usuario(id);
  }
}
