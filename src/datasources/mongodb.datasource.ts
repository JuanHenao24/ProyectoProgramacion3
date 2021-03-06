import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'mongodb',
  connector: 'mongodb',
  url: 'mongodb+srv://red_social_videojuegos_user_db:MqAVf6YQwUD4eaUF@cluster0-rrjsh.mongodb.net/RedSocialDB?retryWrites=true&w=majority',
  host: 'cluster0-rrjsh.mongodb.net',
  port: 27017,
  user: 'red_social_videojuegos_user_db',
  password: 'MqAVf6YQwUD4eaUF',
  database: 'RedSocialDB',
  useNewUrlParser: true
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class MongodbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'mongodb';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.mongodb', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
