
const forChild = (childrensArray: HTMLCollection) => {
  let result: Element[] = [];
  for(let i = 0; i < childrensArray.length; i++){
    result.push(childrensArray[i]);
  }
  return result;
}


export default class TabHandler {
  tbc: Array<{
    button: HTMLElement;
    tab: HTMLElement;
  }> = [];

  constructor (tabComponent?: HTMLElement) {
    this.eatTabComponent(tabComponent);
  }

  displayNoOne(){
    this.tbc.forEach((tb) => {
      this.hideTab(tb.tab);
      this.disableBtn(tb.button);
    });
  }

  showTab(tab: HTMLElement){
    tab.style.display = 'block';
  }
  hideTab(tab: HTMLElement){
    tab.style.display = 'none';
  }

  activeBtn(button: HTMLElement){
    button.classList.add('active');
  }

  disableBtn(button: HTMLElement){
    button.classList.remove('active');
  }

  autoConfigureListeners(){
    this.tbc.forEach((tb) => {
      tb.button.addEventListener("click", () => {
        this.displayNoOne();
        this.showTab(tb.tab);
        this.activeBtn(tb.button);
      });
    });
  }

  register(button: HTMLElement, tab: HTMLElement){
    this.tbc.push({
      button: button,
      tab: tab
    });
  }

  eatTabComponent(tabComponent: HTMLElement){
    let buttons: Element[] = [];
    let tabs: Element[] = [];

    forChild(tabComponent.children).forEach((ch) => {
      if(ch.classList.contains('tab-component_header')) {
        buttons = forChild(ch.children);
      }
      if(ch.classList.contains('tab-component_body')) {
        tabs = forChild(ch.children);
      }
    });

    buttons.forEach((btn, index) => {
      this.register(<HTMLElement>btn, <HTMLElement>tabs[index]);
    });
  }
}