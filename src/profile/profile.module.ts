import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
import { AuthMiddleware } from '../shared/middleware/auth.middleware';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from '../user/user.entity';
import { UserModule } from '../user/user.module';

@Module({
  controllers: [ProfileController],
  providers: [ProfileService],
  imports: [MikroOrmModule.forFeature({ entities: [User] }), UserModule],
})
export class ProfileModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes({
      path: 'profiles/:username/follow',
      method: RequestMethod.ALL,
    });
  }
}
