import { createBrowserHistory } from "history";
import FuryConnectSwitch from "./components/FuryConnectSwitch/FuryConnectSwitch";
// import "fury-design-system/dist/eui_theme_fury_community.css";
import "./index.scss";

window.customElements.define("fury-connect-switch", FuryConnectSwitch);

// let head = document.getElementsByTagName("head")[0];
//     var link = document.createElement("link");
//     link.rel = "stylesheet";
//     link.type = "text/css";
// link.href = "index.css";
//     head.appendChild(link);
let history = createBrowserHistory();

const appContent = document.querySelector("#root");

const routes = {
  "/": "fury-connect-switch"
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

