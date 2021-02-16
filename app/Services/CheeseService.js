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

    } else {

    }
  }



}

export const cheeseService = new CheeseService();

