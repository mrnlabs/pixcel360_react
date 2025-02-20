type LogLevel = "log" | "info" | "warn" | "error";

export const log = (msg: string, level: LogLevel = "log"): void => {
    console[level](`[LOG]: ${msg}`);
};
  