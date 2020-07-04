import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Comentario,
  Publicaciones,
} from '../models';
import {ComentarioRepository} from '../repositories';

export class ComentarioPublicacionesController {
  constructor(
    @repository(ComentarioRepository)
    public comentarioRepository: ComentarioRepository,
  ) { }

  @get('/comentarios/{id}/publicaciones', {
    responses: {
      '200': {
        description: 'Publicaciones belonging to Comentario',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Publicaciones)},
          },
        },
      },
    },
  })
  async getPublicaciones(
    @param.path.string('id') id: typeof Comentario.prototype.id_comentario,
  ): Promise<Publicaciones> {
    return this.comentarioRepository.publicaciones(id);
  }
}
