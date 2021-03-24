import { __prod__ } from "./constants";
import { MikroORM } from "@mikro-orm/core";
import { Post } from "./entities/Post";
import { User } from "./entities/User";
import path from "path";

export default {
	dbName: "lireddit",
	debug: !__prod__,
	entities: [Post, User],
	migrations: {
		path: path.join(__dirname, "./migrations"),
		pattern: /^[\w-]+\d+\.[tj]s$/,
	},
	password: "westeros",
	type: "postgresql",
	user: "postgres",
} as Parameters<typeof MikroORM.init>[0];
