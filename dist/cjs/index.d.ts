import { PgTable } from "drizzle-orm/pg-core";
import { type TSchema } from "elysia";
export interface optionsParams {
    excludePrimaryKey?: boolean;
    excludedColumns?: Array<string>;
}
export declare const parseDrizzleModel: (table: PgTable, params?: optionsParams) => TSchema;
export default parseDrizzleModel;
