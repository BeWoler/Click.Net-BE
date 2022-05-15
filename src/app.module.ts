import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: `.env`,
    }),
    SequelizeModule.forRoot({
      dialect: 'postgres',
      host: process.env.PSQL_HOST,
      port: Number(process.env.PSQL_PORT),
      username: process.env.PSQL_USERNAME,
      password: process.env.PSQL_PASSWORD,
      database: process.env.PSQL_DB,
      autoLoadModels: true,
      models: [],
      dialectOptions: {
        ssl: { rejectUnauthorized: false },
      },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
