import { getTableConfig } from "drizzle-orm/pg-core";
import { t } from "elysia";
const defaultParams = {
    excludePrimaryKey: true,
    excludedColumns: []
};
export const parseDrizzleModel = (table, params = defaultParams) => {
    const { columns } = getTableConfig(table);
    if (columns === undefined)
        return t.Object({});
    const properties = {};
    for (const element of columns) {
        if (params.excludePrimaryKey && element.primary) {
            continue;
        }
        if (!params.excludedColumns?.includes(element.name)) {
            properties[element.name] = parseTypes(element);
        }
    }
    return t.Object(properties);
};
function parseTypes(element) {
    switch (element.dataType) {
        case "string":
            return t.String();
        case "number":
            return t.Number();
        case "boolean":
            return t.Boolean();
        case "json":
            return t.Object({});
        case "date":
            return t.Date({});
        default:
            return t.Never();
    }
}
