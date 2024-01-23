import { IsoBench } from "iso-bench";

const COUNT = 50;

export class Component {
  static instancesMapArray = new Array<Component | null>(COUNT * 2).fill(null);
  static instanceMapsArraySparse = new Array<Component>();
  static instanceMap = new Map<number, Component>();

  static addArray(entityId: number, component: Component) {
    this.instancesMapArray[entityId] = component;
  }

  static getArray(entityId: number) {
    const instancesMap = this.instancesMapArray;
    return instancesMap[entityId];
  }

  static addMap(entityId: number, component: Component) {
    this.instanceMap.set(entityId, component);
  }

  static getMap(entityId: number) {
    const instancesMap = this.instanceMap;
    return instancesMap.get(entityId);
  }

  static addSparse(entityId: number, component: Component) {
    this.instanceMapsArraySparse[entityId] = component;
  }

  static getSparse(entityId: number) {
    const instancesMap = this.instanceMapsArraySparse;
    return instancesMap[entityId];
  }
}

class Test extends Component {
  public number = 0;
  public string = "";
  public boolean = false;
}

const bench = new IsoBench("Get by id strategies");

bench.add(
  "Array: Dense - All filled",
  () => {
    for (let i = 0; i < COUNT; i++) {
      Component.getArray(i);
    }
  },
  () => {
    for (let i = 0; i < COUNT; i++) {
      const component = new Test();
      const entityId = i;
      Component.addArray(entityId, component);
    }
  }
);

bench.add(
  "Array: Dense - Every other filled",
  () => {
    for (let i = 0; i < COUNT; i++) {
      Component.getArray(i * 2);
    }
  },
  () => {
    for (let i = 0; i < COUNT; i++) {
      const component = new Test();
      const entityId = i * 2;
      Component.addArray(entityId, component);
    }
  }
);

bench.add(
  "Array: Dense - Every other filled - mixed",
  () => {
    for (let i = 0; i < COUNT; i++) {
      Component.getArray(i * 2);
    }
  },
  () => {
    for (let i = 0; i < COUNT; i++) {
      const component = new Test();
      const entityId = i * 2;
      Component.addArray(entityId, component);
    }
    for (let i = 0; i < COUNT; i++) {
      const index = i * 5;
      Component.instancesMapArray[index] = 0;
    }
  }
);

bench.add(
  "Array: Sparse",
  () => {
    for (let i = 0; i < COUNT; i++) {
      Component.getSparse(i);
    }
  },
  () => {
    for (let i = 0; i < COUNT; i++) {
      const component = new Test();
      const entityId = i;
      Component.addSparse(entityId, component);
    }
  }
);

bench.add(
  "Map",
  () => {
    for (let i = 0; i < COUNT; i++) {
      Component.getMap(i);
    }
  },
  () => {
    for (let i = 0; i < COUNT; i++) {
      const component = new Test();
      const entityId = i;
      Component.addMap(entityId, component);
    }
  }
);

bench.consoleLog().run();
