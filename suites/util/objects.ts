import { buffer } from "stream/consumers";

export type Vector3Representation = { x: number; y: number; z: number };
export type Vector3SoARepresentation = {
  x: Float64Array | Float32Array | number[];
  y: Float64Array | Float32Array | number[];
  z: Float64Array | Float32Array | number[];
};

export class Vector3 {
  static buffers = {
    x: new Float64Array(1000),
    y: new Float64Array(1000),
    z: new Float64Array(1000),
  };

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

export const createFloat64Interface = (buffer: Float64Array) => {
  return {
    read(index: number) {
      return buffer[index];
    },
    write(index: number, value: number) {
      buffer[index] = value;
    },
  };
};

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

  update(index: number) {
    this.x.write(index, this.x.read(index) + 2);
    this.y.write(index, this.y.read(index) - 2);
    this.z.write(index, this.z.read(index) * 2);
  }
}

export class Vector3SoAInterfaceStatic {
  // static buffers = {
  //   x: new Float64Interface(new Float64Array(1000)),
  //   y: new Float64Interface(new Float64Array(1000)),
  //   z: new Float64Interface(new Float64Array(1000)),
  // };

  static buffers = {
    x: createFloat64Interface(new Float64Array(1000)),
    y: createFloat64Interface(new Float64Array(1000)),
    z: createFloat64Interface(new Float64Array(1000)),
  };

  static buffersRaw = {
    x: new Float64Array(1000),
    y: new Float64Array(1000),
    z: new Float64Array(1000),
  };

  static getBuffers() {
    return Vector3SoAInterfaceStatic.buffers;
  }

  static getBuffersInterface() {
    return new Vector3SoAInterface(Vector3SoAInterfaceStatic.buffersRaw);
  }

  static update(index: number) {
    this.buffers.x.write(index, this.buffers.x.read(index) + 2);
    this.buffers.y.write(index, this.buffers.y.read(index) - 2);
    this.buffers.z.write(index, this.buffers.z.read(index) * 2);
  }
}

export const vector3BufferObject = {
  x: new Float64Interface(new Float64Array(1000)),
  y: new Float64Interface(new Float64Array(1000)),
  z: new Float64Interface(new Float64Array(1000)),
};
