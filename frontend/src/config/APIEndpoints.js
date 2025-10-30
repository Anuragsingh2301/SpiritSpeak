const config = {
  environment: import.meta.env.VITE_APP_ENV || "local",
  endpoints: {
    prod: import.meta.env.VITE_APP_BACKEND_URL || "",
    dev: "",
    local: "http://localhost:3000",
  },
  getEndpoint() {
    switch (this.environment) {
      case "local":
        return this.endpoints.local;
      case "development":
        return this.endpoints.dev;
      case "production":
        return this.endpoints.prod;
      default:
        return "http://localhost:3000";
    }
  },
};

export default config;
