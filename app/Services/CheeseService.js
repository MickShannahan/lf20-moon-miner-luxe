import { ProxyState } from "../AppState.js";

class CheeseService {
  getCheese(method) {
    let miner = ProxyState.miners[method]
    ProxyState.cheese += (miner.quantity * miner.mineValue) * ProxyState.refineMultiplier
  }
  upgradeMiner(miner) {
    if (miner.upgradeCost <= ProxyState.cheese) {
      ProxyState.cheese -= miner.upgradeCost
      miner.quantity++
      miner.upgradeCost += miner.upgradeCost
      ProxyState.refineMultiplier += miner.refineValue
      // TODO ADD SWAL SUCCESS
      swal.fire({
        title: miner.name + " purchased!",
        toast: true,
        icon: "success",
        showConfirmButton: false,
        position: "top-right",
        timer: 5000,
        timerProgressBar: true,
        background: '#90ee90'
      })
    } else {
      swal.fire({
        title: "Could not purchase " + miner.name + " not enough cheese",
        toast: true,
        icon: "error",
        showConfirmButton: false,
        position: "top-right",
        timer: 5000,
        timerProgressBar: true,
        background: '#bd6666'
      })
    }
  }



}

export const cheeseService = new CheeseService();

