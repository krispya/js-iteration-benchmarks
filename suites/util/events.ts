import { EventEmitter } from "tseep";
import { Vector3SoARepresentation } from "./objects";

const hasChange = [];

export class Vector3WithGetSetWithEvents {
  static hasChange: number[] = [];

  private _x: number;
  private _y: number;
  private _z: number;
  public emitter: EventEmitter;

  constructor(x: number, y: number, z: number) {
    this.emitter = new EventEmitter();
    this._x = x;
    this._y = y;
    this._z = z;
  }

  get x() {
    return this._x;
  }

  set x(value: number) {
    this._x = value;
    this.emitter.emit("change", value);
  }

  get y() {
    return this._y;
  }

  set y(value: number) {
    this._y = value;
    this.emitter.emit("change", value);
  }

  get z() {
    return this._z;
  }

  set z(value: number) {
    this._z = value;
    this.emitter.emit("change", value);
  }
}

export class Float64InterfaceWithEvents {
  static hasChange: number[] = [];

  public store: Float64Array;
  public emitter: EventEmitter;

  constructor(store: Float64Array, emitter: EventEmitter) {
    this.store = store;
    this.emitter = emitter;
  }

  read(index: number) {
    return this.store[index];
  }

  write(index: number, value: number) {
    this.store[index] = value;
    // hasChange[0] = 1;
    this.emitter.emit("change", value);
  }
}

export class Vector3SoAInterfaceWithEvents {
  public x: Float64InterfaceWithEvents;
  public y: Float64InterfaceWithEvents;
  public z: Float64InterfaceWithEvents;
  public emitter: EventEmitter;

  constructor(vector3: Vector3SoARepresentation) {
    this.emitter = new EventEmitter();
    this.x = new Float64InterfaceWithEvents(
      vector3.x as Float64Array,
      this.emitter
    );
    this.y = new Float64InterfaceWithEvents(
      vector3.y as Float64Array,
      this.emitter
    );
    this.z = new Float64InterfaceWithEvents(
      vector3.z as Float64Array,
      this.emitter
    );
  }
}

export function observePropertyWithDefine(
  object: any,
  property: string,
  callback: (value: any) => void
) {
  const emitter = new EventEmitter();
  let originalValue = object[property];

  Object.defineProperty(object, property, {
    get() {
      return originalValue;
    },
    set(value: any) {
      originalValue = value;
      hasChange[0] = 1;
    },
  });
  emitter.on("change", callback);
}
