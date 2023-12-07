import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TeamModule } from './teams/teams.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://root:mdp@mongodb:27017', {
      dbName: 'rcr',
    }),
    TeamModule,
  ],
  controllers: [], // Ajoutez vos autres contrôleurs ici
  providers: [], // Ajoutez vos autres services ici
})
export class AppModule {}
