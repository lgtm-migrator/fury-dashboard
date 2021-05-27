export declare global {
  interface Window {
    DASHBOARD_CONFIG: {
      REMOTE_COMPONENTS: {
        [key: string]: {
          Scope: string;
          Module: string;
          Url: string;
          Params?: {
            [key: string]: any;
          };
        };
      };
    };
    APP_CONFIG: {
      APP_ENDPOINT: string;
    };
  }
}
