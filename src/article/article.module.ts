import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ArticleController } from './article.controller';
import { ArticleService } from './article.service';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Article } from './article.entity';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';
import { AuthMiddleware } from '../shared/middleware/auth.middleware';
import { Comment } from './comment.entity';

@Module({
  controllers: [ArticleController],
  providers: [ArticleService],
  imports: [
    MikroOrmModule.forFeature({ entities: [Article, Comment, User] }),
    UserModule,
  ],
})
export class ArticleModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuthMiddleware)
      .forRoutes(
        { path: 'articles/feed', method: RequestMethod.GET },
        { path: 'articles', method: RequestMethod.POST },
        { path: 'articles/:slug', method: RequestMethod.DELETE },
        { path: 'articles/:slug', method: RequestMethod.PUT },
        { path: 'articles/:slug/comments', method: RequestMethod.POST },
        { path: 'articles/:slug/comments/:id', method: RequestMethod.DELETE },
        { path: 'articles/:slug/favorite', method: RequestMethod.POST },
        { path: 'articles/:slug/favorite', method: RequestMethod.DELETE },
      );
  }
}
