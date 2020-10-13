import Achievement from "./Models/Achievement.js"
import Value from "./Models/Value.js"
import { EventEmitter } from "./Utils/EventEmitter.js"
import { isValidProp } from "./Utils/isValidProp.js"

class AppState extends EventEmitter {
  /** @type {Value[]} */
  values = []
  cheese = 0
  refineMultiplier = 1
  /** @type {Achievement[]} */
  achievements = []
  miners = {
    clicker: {
      name: "clicker",
      quantity: 1,
      mineValue: 1,
      refineValue: 0,
      upgradeCost: 10,
    },
    astronaut: {
      name: "astronaut",
      quantity: 0,
      mineValue: 1,
      refineValue: 0,
      upgradeCost: 50,
    },
    drill: {
      name: "drill",
      quantity: 0,
      mineValue: 10,
      refineValue: 0,
      upgradeCost: 250,
    },
    refiner: {
      name: "refiner",
      quantity: 0,
      mineValue: 0,
      refineValue: .1,
      upgradeCost: 700,
    }
  }
}

export const ProxyState = new Proxy(new AppState(), {
  get(target, prop) {
    isValidProp(target, prop)
    return target[prop]
  },
  set(target, prop, value) {
    isValidProp(target, prop)
    target[prop] = value
    target.emit(prop, value)
    return true
  }
})
