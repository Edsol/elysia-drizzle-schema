import { getTableConfig, PgTable, PgColumn } from "drizzle-orm/pg-core";
import { t } from "elysia";

interface params {
    excludePrimaryKey?: boolean,
    exludedColumns?: Array<String>
};

export const parseDrizzleModel = (table: PgTable, params?: params) => {
    const { columns } = getTableConfig(table);

    if (columns === undefined) return t.Object({})

    let properties: { [key: string]: any } = {};
    columns.forEach((element: PgColumn) => {
        if (
            element.primary && params?.excludePrimaryKey ||
            params?.exludedColumns !== undefined && params?.exludedColumns.includes(element.name)
        ) {
            return;
        }
        properties[element.name] = parseTypes(element)
    })

    let elysiaSchema = t.Object(properties);
    return elysiaSchema;
}

function parseTypes(element: PgColumn) {
    switch (element.dataType) {
        case 'string':
            return t.String();
            break;
        case 'number':
            return t.Number();
            break;
        case 'boolean':
            return t.Boolean();
            break;
        case 'json':
            return t.Object({});
            break;
        case 'date':
            return t.Date({});
            break;
        default:
            return t.Never();
            break;
    }
}