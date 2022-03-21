import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { GraphQLModule } from "@nestjs/graphql";
import { MongooseModule } from "@nestjs/mongoose";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DATABASE_URL } from "./config";
import { UserModule } from "./user/user.module";
import { UserService } from "./user/user.service";

@Module({
  imports: [
    MongooseModule.forRoot(DATABASE_URL),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: true,
      playground: true,
      debug: false,
    }),
    UserModule,
  ],
  // FIXME: Remove these and app.controller.ts (here only to have a temporary resolver for graphql to work.)
  providers: [AppService, AppController, UserService],
})
export class AppModule {}
