import { Connection } from "mongoose";
import { TasksSchema } from "./schema";
import { CommonConst } from "../../common.const";

export const TaskProviders = [
  {
    provide: CommonConst.TASK_QUERY_MODEL_TOKEN,
    useFactory: (connection: Connection) =>
      connection.model(CommonConst.TASK_COLLECTION, TasksSchema),
    inject: [CommonConst.QUERY_CONNECTION_TOKEN],
  },
];
