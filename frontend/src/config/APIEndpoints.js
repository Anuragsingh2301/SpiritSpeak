const config = {
  environment: import.meta.env.REACT_APP_ENV || "local",
  endpoints: {
    prod: "https://spirit-speak-aarm.vercel.app/",
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
