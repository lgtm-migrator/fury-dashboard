import { createBrowserHistory } from "history";
import FuryDashboard from "./components/FuryDashboard/FuryDashboard";
import "./index.scss";

window.customElements.define("fury-dashboard", FuryDashboard);

let history = createBrowserHistory();

const appContent = document.querySelector("#root");

const routes = {
  "/": "div",
  "/support": "fury-dashboard"
};

const findComponentName = (pathName: string) => {
  console.log("pathname", pathName)
  return routes[pathName] || "not found";
};

const updatePageComponent = (location) => {
  console.log("location", location);
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

