export default class Achievement {
  constructor(title, comment, requirements, icon) {
    this.title = title
    this.comment = comment
    this.requirements = requirements
    this.iceon = icon
    this.unlocked = false
  }
}