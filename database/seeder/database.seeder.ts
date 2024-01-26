import { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { User } from '../../src/user/user.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const author = em.create(User, {
      username: 'hcruz',
      email: 'hcruz@gmail',
      password: 'hcruz@',
      bio: '', // Add a value for the 'bio' property
      image: '', // Add a value for the 'image' property
    });
    em.persist(author);
  }
}
