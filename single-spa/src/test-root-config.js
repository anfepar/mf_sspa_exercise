import { registerApplication, start } from "single-spa";
import {
  constructApplications,
  constructRoutes,
  constructLayoutEngine,
} from "single-spa-layout";
import microfrontendLayout from "./microfrontend-layout.html";

const appUrls = {
  "@pizza/select": "http://localhost:3001/src/lifecycle.jsx",
  "@pizza/payment": "http://localhost:3002/src/lifecycle.jsx",
  "@pizza/tracker": "http://localhost:3003/src/lifecycle.jsx",
};

const routes = constructRoutes(microfrontendLayout);
const applications = constructApplications({
  routes,
  loadApp({ name }) {
    return import(/* webpackIgnore: true */ appUrls[name]);
  },
});
const layoutEngine = constructLayoutEngine({ routes, applications });

applications.forEach(registerApplication);
layoutEngine.activate();
start();
