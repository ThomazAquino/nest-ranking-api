import { Module } from '@nestjs/common';
import { JogadoresModule } from './jogadores/jogadores.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:jMEfPH6ZpUR9AFwy@cluster0.asi3s.mongodb.net/smarthRanking?retryWrites=true&w=majority',
      {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false }
    ),
    JogadoresModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
