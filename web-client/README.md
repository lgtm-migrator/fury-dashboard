### Fury Dashboard UI

This interface will include all the future UIs related to our Fury standalone services, as per [`fury-connect-switch`](https://github.com/sighupio/fury-connect-switch).

![populated dashboard](../docs/populated-dashboard.png)

### Local Development

Go into the `/web-client` folder and run `yarn dev` or `yarn start` to run the project.

**WATCH OUT** This project needs other active services (for now only one) to shows the true aggregator functionality of dashboard. You can see the whole picture by downloading and running also the [`fury-connect-switch`](https://github.com/sighupio/fury-connect-switch/tree/ui) project.

If no services will be found, you'll simply see the empty dashboard and a text that tells about the services you are trying to import.

![empty dashboard](../docs/empty-dashboard.png)