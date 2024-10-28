import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AccountsModule } from './accounts/accounts.module';
import { PicturesModule } from './pictures/pictures.module';
import { TagsModule } from './tags/tags.module';
import { ActivitiesModule } from './activities/activities.module';

@Module({
  imports: [
    AuthModule,
    UsersModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: +process.env.DB_LOCAL_PORT,
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        autoLoadEntities: true,
        synchronize: true,
        logging: true, // TODO: only for development
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
      }),
    }),
    AccountsModule,
    PicturesModule,
    TagsModule,
    ActivitiesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
