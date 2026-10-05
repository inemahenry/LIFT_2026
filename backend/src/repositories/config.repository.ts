import pool from "../config/database";

export async function getAllConfigs() {
  const [rows] = await pool.execute(`
    SELECT
      config_key,
      config_value,
      data_type,
      description,
      updated_by,
      updated_at
    FROM business_configs
    ORDER BY config_key
  `);

  return rows;
}

export async function getConfigByKey(key: string) {
  const [rows] = await pool.execute(
    `
    SELECT
      config_key,
      config_value,
      data_type,
      description,
      updated_by,
      updated_at
    FROM business_configs
    WHERE config_key = ?
    LIMIT 1
    `,
    [key]
  );

  return (rows as any[])[0] || null;
}

export async function updateConfig(
  key: string,
  value: string,
  updatedBy: number
) {
  const [result] = await pool.execute(
    `
    UPDATE business_configs
    SET
      config_value = ?,
      updated_by = ?
    WHERE config_key = ?
    `,
    [value, updatedBy, key]
  );

  return result;
}