import { getTableConfig, PgTable, PgColumn } from "drizzle-orm/pg-core";
import { t, type TSchema } from "elysia";

interface params {
    excludePrimaryKey?: boolean;
    excludedColumns?: Array<string>;
}

const defaultParams: params = {
    excludePrimaryKey: true,
    excludedColumns: []
};

export const parseDrizzleModel = (table: PgTable, params: params = defaultParams): TSchema => {
    const { columns } = getTableConfig(table);
    if (columns === undefined) return t.Object({});

    const properties: { [key: string]: TSchema } = {};

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

function parseTypes(element: PgColumn) {
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
