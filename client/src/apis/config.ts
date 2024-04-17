import config from "../utils/config";

export const configOptions = () => {
  if (typeof window === "undefined") return {};

  if (!window.localStorage.getItem(config.key.token)) return {};

  const accessToken = window.localStorage.getItem(config.key.token);

  if (accessToken) {
    return {
      Authorization: `Bearer ${accessToken}`,
    };
  }
};
