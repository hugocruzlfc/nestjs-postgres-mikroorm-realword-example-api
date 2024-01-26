import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagController } from './tag.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Tag } from './tag.entity';
import { UserModule } from '../user/user.module';

@Module({
  providers: [TagService],
  controllers: [TagController],
  imports: [MikroOrmModule.forFeature({ entities: [Tag] }), UserModule],
})
export class TagModule {}
