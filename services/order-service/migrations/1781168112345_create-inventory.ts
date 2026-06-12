import type { ColumnDefinitions, MigrationBuilder } from "node-pg-migrate";

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
  pgm.createTable("inventory", {
    product_id: { type: "varchar", notNull: true },
    qty_available: { type: "integer", notNull: true, default: 0 },
    qty_reserved: { type: "integer", notNull: true, default: 0 },
    version: { type: "integer", notNull: true, default: 0 },
    updated_at: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("now()"),
    },
  });

  pgm.addConstraint('inventory', 'qty_available_non_negative', 'CHECK (qty_available >= 0)');
  pgm.addConstraint('inventory', 'qty_reserved_non_negative', 'CHECK (qty_reserved >= 0)');
}

export async function down(pgm: MigrationBuilder): Promise<void> {
  pgm.dropTable("inventory");
}
