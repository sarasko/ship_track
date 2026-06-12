import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("users", {
    id: {
      type: "uuid",
      primaryKey: true,
      default: pgm.func("gen_random_uuid()"),
    },
    email: { type: "varchar", notNull: true, unique: true },
    password_hash: { type: "varchar", notNull: true },
    created_at: { type: "timestamp", default: pgm.func("now()") },
  });

  pgm.createIndex('users', 'email');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("users");
}
