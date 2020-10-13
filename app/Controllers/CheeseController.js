import { ProxyState } from "../AppState.js";
import { cheeseService } from "../Services/CheeseService.js";

//Private
function _draw() {
  drawScore();
  drawShop();
  drawStats();
};
{ }
function drawScore() {
  let scoreBoard = document.getElementById("current-cheese")
  scoreBoard.innerHTML = `${ProxyState.cheese.toFixed(2)}`
  // TODO ADD CHEESE COUNT TO SHOP
  document.querySelector('#shop-cheese').innerHTML = "Cheese: " + `${ProxyState.cheese.toFixed(2)}`
}
function drawShop() {
  let shop = document.getElementById("shop")
  let template = ''
  for (let miner in ProxyState.miners) {
    let option = ProxyState.miners[miner]
    template += `<button class="col-5 btn border text-light m-1 fancy-border text-capitalize" onclick="app.cheeseController.upgradeMiner('${option.name}')">${option.name} - ${option.upgradeCost}</button>`
  }
  shop.innerHTML = template
}

function drawStats() {
  let stats = document.getElementById("stats")
  let template = ''
  for (let statBlock in ProxyState.miners) {
    let miner = ProxyState.miners[statBlock]
    template += ` <div class="col-12 border border-light fancy-border">
    ${miner.name}` + ' : ' + `${miner.quantity}` + ' : ' + `${(miner.quantity * miner.mineValue) * 60}` + ' cpm' +
      "</div >"
  }
  stats.innerHTML = template
}
//Public
export default class CheeseController {
  constructor() {
    _draw()
    this.CheeseInterval()
    ProxyState.on("cheese", _draw);

    // swal.fire({
    //   toast: true,
    //   icon: "success",
    //   showConfirmButton: false,
    //   title: "Hi there",
    //   position: "top-right",
    //   timer: 5000,
    //   timerProgressBar: true

    // })
  }

  getCheese(method) {
    cheeseService.getCheese(method)
  }

  CheeseInterval() {
    setInterval(this.autoMiner, 1000)
    // TODO ACHIEVEMENT INTERVAL
    setInterval(this.checkAchievements, 3000)
  }

  autoMiner() {
    for (let method in ProxyState.miners) {
      if (method != "clicker") {
        cheeseService.getCheese(method)
      }
    }
    // console.log(currentCheese)
  }

  checkAchievements() {
    for (let a in ProxyState.achievements) {
      let achieve = ProxyState.achievements[a]
      if (!achieve.unlocked) {
        if (achieve.requirements == ProxyState[achieve.requirements]) {
          swal.fire({
            toast: true,
            icon: "success",
            showConfirmButton: false,
            title: achieve.title,
            text: achieve.comment,
            position: "center",
            timer: 5000,
            timerProgressBar: true
          })
          achieve.unlocked = true
        }
      }
    }
  }

  upgradeMiner(choice) {
    let miner = ProxyState.miners[choice]
    cheeseService.upgradeMiner(miner)
  }



}
