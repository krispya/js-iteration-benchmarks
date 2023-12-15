export class Vector3 {
  public x: number;
  public y: number;
  public z: number;

  constructor(x: number, y: number, z: number) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
}

export class Vector3WithGetSet {
  private _x: number;
  private _y: number;
  private _z: number;

  constructor(x: number, y: number, z: number) {
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get x() {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
  }

  get y() {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
  }

  get z() {
    return this._z;
  }

  set z(value: number) {
    this._z = value;
  }
}

export class Vector3SoAReader {
  public index: number;
  public store: { x: Float64Array; y: Float64Array; z: Float64Array };

  constructor(
    store: { x: Float64Array; y: Float64Array; z: Float64Array },
    index: number
  ) {
    this.store = store;
    this.index = index;
  }

  get x() {
    return this.store.x[this.index];
  }

  get y() {
    return this.store.y[this.index];
  }

  get z() {
    return this.store.z[this.index];
  }

  set x(value: number) {
    this.store.x[this.index] = value;
  }

  set y(value: number) {
    this.store.y[this.index] = value;
  }

  set z(value: number) {
    this.store.z[this.index] = value;
  }
}
