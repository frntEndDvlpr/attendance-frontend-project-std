import Constants from "expo-constants";

const settings = {
  dev: {
    apiUrl: "https://attendance-ksa-247f689c4e51.herokuapp.com/",
  },

  staging: {
    apiUrl: "https://attendance-ksa-247f689c4e51.herokuapp.com/",
  },

  prod: {
    apiUrl: "https://attendance-ksa-247f689c4e51.herokuapp.com/",
  },
};

const getCurrentSettings = () => {
  if (__DEV__) return settings.dev;
  if (Constants.manifest.releaseChannel === "staging") return settings.staging;
  return settings.prod;
};

export default getCurrentSettings();
