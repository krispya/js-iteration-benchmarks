export type Vector3Representation = { x: number; y: number; z: number };
export type Vector3SoARepresentation = {
  x: Float64Array | Float32Array | number[];
  y: Float64Array | Float32Array | number[];
  z: Float64Array | Float32Array | number[];
};

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

export class Vector3GetSetInstance {
  public instance: Vector3;

  constructor(x: number, y: number, z: number) {
    this.instance = new Vector3(x, y, z);
  }

  get x() {
    return this.instance.x;
  }

  set x(value: number) {
    this.instance.x = value;
  }

  get y() {
    return this.instance.y;
  }

  set y(value: number) {
    this.instance.y = value;
  }

  get z() {
    return this.instance.z;
  }

  set z(value: number) {
    this.instance.z = value;
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

export class Float64Interface {
  public store: Float64Array;

  constructor(store: Float64Array) {
    this.store = store;
  }

  read(index: number) {
    return this.store[index];
  }

  write(index: number, value: number) {
    this.store[index] = value;
  }
}

export class Vector3SoAInterface {
  public x: Float64Interface;
  public y: Float64Interface;
  public z: Float64Interface;

  constructor(vector3: Vector3SoARepresentation) {
    this.x = new Float64Interface(vector3.x as Float64Array);
    this.y = new Float64Interface(vector3.y as Float64Array);
    this.z = new Float64Interface(vector3.z as Float64Array);
  }
}

class Float64InterfaceWithIndex {
  public store: Float64Array;
  public index: number;

  constructor(store: Float64Array, index: number) {
    this.store = store;
    this.index = index;
  }

  read() {
    return this.store[this.index];
  }

  write(value: number) {
    this.store[this.index] = value;
  }
}

export class Vector3SoAWithReadWrite {
  static buffers = {
    x: new Float64Array(100000).fill(1),
    y: new Float64Array(100000).fill(1),
    z: new Float64Array(100000).fill(1),
  };

  static accessors = {
    x: new Float64InterfaceWithIndex(this.buffers.x, 0),
    y: new Float64InterfaceWithIndex(this.buffers.y, 0),
    z: new Float64InterfaceWithIndex(this.buffers.z, 0),
  };

  static getBuffers(index: number = 0) {
    const accessors = this.accessors;
    accessors.x.index = index;
    accessors.y.index = index;
    accessors.z.index = index;

    return {
      x: accessors.x,
      y: accessors.y,
      z: accessors.z,
    };
  }
}
