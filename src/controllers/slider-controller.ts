export default class SliderController {
  private container: HTMLElement;
  private _offset = 0;
  private _isAimateFinished = true;

  constructor (sliderContainer: HTMLElement) {
    this.container = sliderContainer;
    // console.log(this.container.children);
    window.addEventListener('resize', () => {
      if(!this._isAimateFinished){
        return;
      }
      this.resize();
    });
  }

  set offset(value:number){
    this._offset = value;
    this.updateStyles();
  }
  get offset(){
    return this._offset;
  }

  async resize(){
    this.updateStyles(false)
    setTimeout(() => {
      this.updateStyles(false)
    }, 300);
  }

  async updateStyles(anim = true) {
    if(!this._isAimateFinished){ return; }
    for(let i = 0; i < this.container.children.length; i++){
      this._isAimateFinished = false;
      let current = <HTMLElement>this.container.children[i];
      console.dir(`translateX(-${current.clientWidth * this._offset}px)`);
      if(anim){
        current.style.transition = '1s';
      }
      current.style.transform = `translateX(${current.clientWidth * this._offset + this._offset * 20 + 10}px)`;
      // current.style.marginLeft = Number.parseInt(current.style.marginLeft) * this._offset + 'px';
    }
    setTimeout(() => {
      for(let i = 0; i < this.container.children.length; i++){
        let current = <HTMLElement>this.container.children[i];
        current.style.transition = '0s';
        this._isAimateFinished = true;
      }
      return;
    }, 1000);
  }

  slideLeft(size = 1) {
    if(!this._isAimateFinished){ return; }
    this.offset += size;
  }

  slideRight(size = 1) {
    if(!this._isAimateFinished){ return; }
    this.offset -= size;
  }

}