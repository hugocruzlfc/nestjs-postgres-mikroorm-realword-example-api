import {
  MiddlewareConsumer,
  Module,
  NestModule,
  OnModuleInit,
} from '@nestjs/common';
import { MikroORM } from '@mikro-orm/core';
import { MikroOrmMiddleware, MikroOrmModule } from '@mikro-orm/nestjs';
import { UserModule } from './user/user.module';
import { TagModule } from './tag/tag.module';
import { ArticleModule } from './article/article.module';
import { ProfileModule } from './profile/profile.module';
import { ConfigModule } from '@nestjs/config';
import { configurations, validate } from './config';

@Module({
  imports: [
    MikroOrmModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configurations],
      cache: true,
      validate,
    }),
    UserModule,
    TagModule,
    ArticleModule,
    ProfileModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule, OnModuleInit {
  constructor(private readonly orm: MikroORM) {}

  async onModuleInit(): Promise<void> {
    await this.orm.getMigrator().up();
  }

  // for some reason the auth middlewares in profile and article modules are fired before the request context one,
  // so they would fail to access contextual EM. by registering the middleware directly in AppModule, we can get
  // around this issue
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(MikroOrmMiddleware).forRoutes('*');
  }
}
