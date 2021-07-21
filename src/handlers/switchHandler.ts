export default class SwitchHandler {
  private switchings: HTMLElement[] = [];
  private currnetSwitch: number = 0;
  readonly parent: HTMLElement;

  constructor(parent: HTMLElement){
    this.parent = parent;
    this.switchings = SwitchHandler.eatChilds(this.parent);
    this.hideSwitchings();
    this.render();
  }

  private static eatChilds(element: HTMLElement) {
    let result = [];
    for(let i = 0; i < element.children.length; i++){
      result.push(<HTMLElement>element.children[i])
    }
    return result;
  }

  private hideSwitchings(){
    this.switchings.forEach( (sw) => {
      sw.remove();
    });
    return this;
  }

  siwitch(index?: number){
    if(index && index <= this.switchings.length && index >= 0){
      this.currnetSwitch = index;
      return this.render();
    }

    this.currnetSwitch = (this.currnetSwitch + 1) % this.switchings.length;

    return this.render();
  }

  private render(): SwitchHandler{
    this.parent.innerHTML = "";
    this.parent.appendChild(this.switchings[this.currnetSwitch]);
    return this;
  }
}