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
  Publicaciones,
} from '../models';
import {EtiquetadoRepository} from '../repositories';

export class EtiquetadoPublicacionesController {
  constructor(
    @repository(EtiquetadoRepository)
    public etiquetadoRepository: EtiquetadoRepository,
  ) { }

  @get('/etiquetados/{id}/publicaciones', {
    responses: {
      '200': {
        description: 'Publicaciones belonging to Etiquetado',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publicaciones)},
          },
        },
      },
    },
  })
  async getPublicaciones(
    @param.path.string('id') id: typeof Etiquetado.prototype.id,
  ): Promise<Publicaciones> {
    return this.etiquetadoRepository.publicaciones(id);
  }
}
