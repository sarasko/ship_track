import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("order_items", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    order_id: {
      type: "uuid",
      notNull: true,
      references: "orders(id)",
      onDelete: "cascade",
    },
    product_id: {
      type: "varchar",
      notNull: true,
    },
    quantity: { type: "integer", notNull: true, default: 1 },
    unit_price: { type: "numeric(12, 4)", notNull: true },
  });

  pgm.createIndex('order_items', 'order_id');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("order_items");
}
