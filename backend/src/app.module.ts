import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SnippetsModule } from './snippets/snippets.module';
import { ConfigModule } from '@nestjs/config';


const MONGO_URI = process.env.MONGO_URI || 'mongodb+srv://cluster0.tcwpunw.mongodb.net/Snippet_Vault';
@Module({
  imports: [
    ConfigModule.forRoot(),

    MongooseModule.forRoot(MONGO_URI),

    SnippetsModule,
  ],
})
export class AppModule {}