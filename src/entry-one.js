import helloWorld from "./hello-world";

import button from "./components/button/button";
helloWorld();

const newButton = new button();
newButton.render();


if (process.env.NODE_ENV === "production") {
  console.log("production mode");
} else if (process.env.NODE_ENV === "development") {
  console.log("development mode");
}
