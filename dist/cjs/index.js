"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseDrizzleModel = void 0;
const pg_core_1 = require("drizzle-orm/pg-core");
const elysia_1 = require("elysia");
const defaultParams = {
    excludePrimaryKey: true,
    excludedColumns: []
};
const parseDrizzleModel = (table, params = defaultParams) => {
    const { columns } = (0, pg_core_1.getTableConfig)(table);
    if (columns === undefined)
        return elysia_1.t.Object({});
    const properties = {};
    for (const element of columns) {
        if (params.excludePrimaryKey && element.primary) {
            continue;
        }
        if (!params.excludedColumns?.includes(element.name)) {
            properties[element.name] = parseTypes(element);
        }
    }
    return elysia_1.t.Object(properties);
};
exports.parseDrizzleModel = parseDrizzleModel;
function parseTypes(element) {
    switch (element.dataType) {
        case "string":
            return elysia_1.t.String();
        case "number":
            return elysia_1.t.Number();
        case "boolean":
            return elysia_1.t.Boolean();
        case "json":
            return elysia_1.t.Object({});
        case "date":
            return elysia_1.t.Date({});
        default:
            return elysia_1.t.Never();
    }
}
exports.default = exports.parseDrizzleModel;
