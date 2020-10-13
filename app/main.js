import CheeseController from "./Controllers/CheeseController.js";
import ValuesController from "./Controllers/ValuesController.js";

class App {
  valuesController = new ValuesController();
  cheeseController = new CheeseController();
}

window["app"] = new App();
