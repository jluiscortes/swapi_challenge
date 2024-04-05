import i18next from "i18next";
import i18nextFSBackend from "i18next-node-fs-backend";
import path from "path";
import { PATH_FILE_CONFIG } from "./constants/config-constants";

export const build = async (): Promise<void> => {
  const pathFiles = path.join(__dirname, PATH_FILE_CONFIG);
  await i18next.use(i18nextFSBackend).init({
    lng: "es",
    fallbackLng: "en",
    ns: ["translation"],
    defaultNS: "translation",
    backend: {
      loadPath: pathFiles,
    },
  });
};
