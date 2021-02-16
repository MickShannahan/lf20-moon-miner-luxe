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
  let scoreBoard2 = document.getElementById("current-cheese-2")
  scoreBoard2.innerHTML = `${ProxyState.cheese.toFixed(2)}`

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

  }

  getCheese(method) {
    cheeseService.getCheese(method)

  }

  CheeseInterval() {
    setInterval(this.autoMiner, 1000)
  }

  autoMiner() {
    for (let method in ProxyState.miners) {
      if (method != "clicker") {
        cheeseService.getCheese(method)
      }
    }
    // console.log(currentCheese)
  }



  upgradeMiner(choice) {
    debugger
    let miner = ProxyState.miners[choice]
    if (miner.upgradeCost <= ProxyState.cheese) {
      cheeseService.upgradeMiner(miner)
      swal.fire({
        title: miner.name + " purchased",
        toast: true,
        imageUrl: "https://cdn.mos.cms.futurecdn.net/42E9as7NaTaAi4A6JcuFwG-1200-80.jpg",
        showConfirmButton: false,
        position: "top-right",
        timer: 3000,
        timerProgressBar: true
      })
    } else {
      swal.fire({
        title: "couldn't purchase " + miner.name + " not enough cheese fool",
        toast: true,
        icon: "error",
        showConfirmButton: false,
        position: "top-right",
        timer: 3000,
        timerProgressBar: true

      })
    }
  }



}
