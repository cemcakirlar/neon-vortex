const DEFAULT_MEASUREMENT_ID = "G-M1ZTQ54Q83";

const readEnv = (key: string): string | undefined => {
  const value = import.meta.env[key];
  return typeof value === "string" && value.length > 0 ? value : undefined;
};

export const runtimeConfig = {
  analyticsEnabled: readEnv("VITE_ANALYTICS_ENABLED") !== "false",
  measurementId: readEnv("VITE_GA_MEASUREMENT_ID") ?? DEFAULT_MEASUREMENT_ID,
  enableCheatsInProduction: readEnv("VITE_ENABLE_CHEATS") === "true",
};
