import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("saga_log", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    order_id: {
      type: "uuid",
      notNull: true,
    },
    event_name: { type: "varchar", notNull: true },
    idempotency_key: { type: "varchar", notNull: true, unique: true },
    status: {
      type: "varchar",
      notNull: true,
      default: "processed",
    },
    created_at: { type: "timestamp", default: pgm.func("now()") },
  });

  pgm.createIndex('saga_log', 'order_id');
  pgm.createIndex('saga_log', 'idempotency_key');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("saga_log");
}
