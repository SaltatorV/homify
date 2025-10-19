export class ScreenDimensions {
  private width: number;
  private height: number;


  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
  }


  get getWidth(): number {
    return this.width;
  }

  get getHeight(): number {
    return this.height;
  }
}
