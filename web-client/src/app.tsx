import { createBrowserHistory } from "history";
import FuryDashboard from "./components/FuryDashboard/FuryDashboard";
// import "fury-design-system/dist/eui_theme_fury_community.css";
import "./index.scss";

window.customElements.define("fury-dashboard", FuryDashboard);

let history = createBrowserHistory();

const appContent = document.querySelector("#root");

const routes = {
  "/": "fury-dashboard"
};

const findComponentName = (pathName: string) => {
  return routes[pathName] || "not found";
};

const updatePageComponent = (location) => {
  appContent.innerHTML = `<${findComponentName(location.pathname)} />`;
}

history.listen(updatePageComponent);
updatePageComponent(window.location);

document.addEventListener("click", e => {
  if ((e.target as HTMLAnchorElement).nodeName === "A") {
    const href = (e.target as HTMLAnchorElement).getAttribute("href");
    history.push(href);
    e.preventDefault();
  }
});

