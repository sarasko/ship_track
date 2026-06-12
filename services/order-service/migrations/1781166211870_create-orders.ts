import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createType("order_status", [
    "pending",
    "confirmed",
    "shipped",
    "cancelled",
  ]);

  pgm.createTable("orders", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    user_id: {
      type: "uuid",
      notNull: true,
      references: "users(id)",
      onDelete: "cascade",
    },
    status: { type: "order_status", notNull: true, default: "pending" },
    shipping_address: { type: "text", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("now()") },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  pgm.createIndex('orders', 'user_id');
  pgm.createIndex('orders', 'status');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("orders");
  pgm.dropType("order_status");
}
