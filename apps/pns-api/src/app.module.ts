import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import{ConfigModule} from '@nestjs/config';
import{ GraphQLModule} from '@nestjs/graphql';
import {ApolloDriver} from '@nestjs/apollo'
import { AppResolver } from './app.resolver';
import { ComponentsModule } from './components/components.module';
import { DatabaseModule } from './database/database.module';
import { T } from './libs/types/common';
import { SocketModule } from './components/socket/socket.module';
import { AiModule } from './components/ai/ai.module';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true, // ✅ hamma modulda ConfigService ishlaydi
    envFilePath: '.env',}),
    GraphQLModule.forRoot({
    driver:ApolloDriver,
    playground: true,
    uploads: false,
    autoSchemaFile: true,
    formatError: (error: T) => { 
      const graphQLFormattedError = {
        code: error?.extensions?.code,
        message:
          error?.extensions?.exception?.response?.message ||
          error?.extensions?.response?.message ||
          error?.message,
      };
  
      console.log('GRAPHQL GLOBAL ERR:', graphQLFormattedError);
      return graphQLFormattedError; 
    }

    

  
  
  }), ComponentsModule, DatabaseModule, SocketModule,AiModule
  ],
  controllers: [AppController],
  providers: [AppService, AppResolver],
})
export class AppModule {}
