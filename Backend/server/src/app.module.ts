import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { UsersModule } from './users/users.module.js';
import { AuthModule } from './auth/auth.module.js';
import { ServicesModule } from './services/services.module.js';
import { BookingsModule } from './bookings/bookings.module.js';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Module({
  imports: [
     ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        uri: config.get<string>('MONGO_URI'),
        onConnectionCreate:(connection:Connection)=>{
          connection.on('connected', () => console.log('MongoDB connected'));
          connection.on('error', (err:Error) => console.error('MongoDB error:', err));
          connection.on('disconnected', () => console.log('MongoDB disconnected'));
          return connection;
        }
      })
    }),
    UsersModule,
    AuthModule,
    ServicesModule,
    BookingsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
