import "reflect-metadata";
import { MikroORM } from "@mikro-orm/core";
import mikroConfig from "./mikro-orm.config";
import app from "./app";
import { ApolloServer } from "apollo-server-express";
import { buildSchema } from "type-graphql";
import { HelloResolver } from "./resolvers/hello";
import { PostResolver } from "./resolvers/post";
import { UserResolver } from "./resolvers/user";

const main = async () => {

	const PORT = app.get("PORT");

	const orm = await MikroORM.init(mikroConfig);
	await orm.getMigrator().up();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [HelloResolver, PostResolver, UserResolver],
			validate: false,
		}),
		context: () => ({ em: orm.em }),
	});

	apolloServer.applyMiddleware({ app });

	app.listen(PORT, () => {
		console.log(`API GraphQL started on http://localhost:${PORT}/graphql`);
	});

};

main().catch((err) => console.error(err));
