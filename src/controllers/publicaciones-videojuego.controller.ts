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
  Videojuego,
} from '../models';
import {PublicacionesRepository} from '../repositories';

export class PublicacionesVideojuegoController {
  constructor(
    @repository(PublicacionesRepository)
    public publicacionesRepository: PublicacionesRepository,
  ) { }

  @get('/publicaciones/{id}/videojuego', {
    responses: {
      '200': {
        description: 'Videojuego belonging to Publicaciones',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Videojuego)},
          },
        },
      },
    },
  })
  async getVideojuego(
    @param.path.string('id') id: typeof Publicaciones.prototype.id_publicacion,
  ): Promise<Videojuego> {
    return this.publicacionesRepository.videojuego(id);
  }
}
