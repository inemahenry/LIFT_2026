import {
  getAllConfigs,
  getConfigByKey,
  updateConfig
} from "../repositories/config.repository";

export async function getConfigurations() {
  return getAllConfigs();
}

export async function getConfiguration(key: string) {
  const config = await getConfigByKey(key);

  if (!config) {
    throw new Error(`Configuration '${key}' not found`);
  }

  return config;
}

export async function updateConfiguration(
  key: string,
  value: string,
  updatedBy: number
) {
  const config = await getConfigByKey(key);

  if (!config) {
    throw new Error(`Configuration '${key}' not found`);
  }

  switch (config.data_type) {
    case "INTEGER":
      if (!Number.isInteger(Number(value))) {
        throw new Error(`${key} must be an integer`);
      }
      break;

    case "DECIMAL":
      if (!Number.isFinite(Number(value))) {
        throw new Error(`${key} must be numeric`);
      }
      break;

    case "BOOLEAN":
      if (!["true", "false"].includes(value.toLowerCase())) {
        throw new Error(`${key} must be true or false`);
      }
      break;
  }

  await updateConfig(key, value, updatedBy);

  return getConfigByKey(key);
}

export async function getNumberConfig(
  key: string
): Promise<number> {
  const config = await getConfigByKey(key);

  if (!config) {
    throw new Error(`Configuration '${key}' not found`);
  }

  const value = Number(config.config_value);

  if (!Number.isFinite(value)) {
    throw new Error(`Configuration '${key}' is not numeric`);
  }

  return value;
}

export async function getBooleanConfig(
  key: string
): Promise<boolean> {
  const config = await getConfigByKey(key);

  if (!config) {
    throw new Error(`Configuration '${key}' not found`);
  }

  return config.config_value.toLowerCase() === "true";
}