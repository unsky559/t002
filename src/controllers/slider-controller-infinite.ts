export default class SliderControllerInfinite {
  private container: HTMLElement;
  private _offset = 0;
  private _isAimateFinished = true;
  direction: -1 | 1;

  constructor (sliderContainer: HTMLElement) {
    this.container = sliderContainer;
  }

  async updateStyles(anim = true) {
    if(!this._isAimateFinished){ return; }
    for(let i = 0; i < this.container.children.length; i++){
      this._isAimateFinished = false;
      let current = <HTMLElement>this.container.children[i];
      if(anim){
        current.style.transition = '1s';
      }
      current.style.transform = `translateX(${current.clientWidth * this.direction}px)`;
    }
    setTimeout(() => {
      for(let i = 0; i < this.container.children.length; i++){
        let current = <HTMLElement>this.container.children[i];
        current.style.transition = '0s';
      }
      return;
    }, 1000);
  }

  slideLeft() {
    if(!this._isAimateFinished){ return; }
    this._isAimateFinished = false;
    this.direction = 1;
    // this.updateStyles();
    
    let clone = <HTMLElement>this.container.children[this.container.children.length-1].cloneNode(true);
    // clone.style.background = 'red';
    clone.style.transform = `translateX(${-this.container.children[this.container.children.length - 1].clientWidth}px)`;

    this.container.prepend(clone);

    for(let i = 0; i < this.container.children.length; i++){
      let current = <HTMLElement>this.container.children[i];
      // current.style.transition = '0s';
      current.style.transform = `translateX(${-current.clientWidth}px)`;
    }

    for(let i = 0; i < this.container.children.length; i++){
      let current = <HTMLElement> this.container.children[i];
      current.style.transition = '1s';
      current.style.transform = `translateX(20px)`;
    }

    setTimeout(() => {
      this._isAimateFinished = true;
      this.container.removeChild(this.container.children[this.container.children.length - 1]);
      
      for(let i = 0; i < this.container.children.length; i++){
        let current = <HTMLElement>this.container.children[i];
        current.style.transition = '0s';
      }

    }, 1000);

    // this.updateStyles();

    // setTimeout(() => {
    //   this._isAimateFinished = true;

    // }, 1000);

    

    // setTimeout(() => {
    //   this._isAimateFinished = true;
    //   this.container.removeChild(this.container.children[this.container.children.length]);

    //   for(let i = 0; i < this.container.children.length; i++){
    //     let current = <HTMLElement>this.container.children[i];
    //     current.style.transform = `translateX(20px)`;
    //   }
    // }, 1000);
  }
  
  slideRight() {
    if(!this._isAimateFinished){ return; }
    let clone = <HTMLElement>this.container.children[0].cloneNode(true);
    clone.style.transition = '1s';
    clone.style.transform = `translateX(${-clone.clientWidth}px)`;
    this.container.appendChild(clone);
    
    this.direction = -1;
    this.updateStyles();

    setTimeout(() => {
      this._isAimateFinished = true;
      this.container.removeChild(this.container.children[0]);

      for(let i = 0; i < this.container.children.length; i++){
        let current = <HTMLElement>this.container.children[i];
        current.style.transform = `translateX(20px)`;
      }
    }, 1000);
  }

}