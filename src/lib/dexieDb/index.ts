import Dexie from 'dexie';

export interface DataInterface {
  name: string;
  data: string;
  createdAt: Date;
  updatedAt: Date;
  images: number[];
}

export interface Image {
  id: number;
  name: string;
  blob: Blob;
}

class MdEditorDb extends Dexie {
  data!: Dexie.Table<DataInterface, string>;
  image!: Dexie.Table<Image, number>;

  constructor() {
    super('MdEditorDb');
    this.version(1).stores({
      data: 'name, data, createdAt, updatedAt, *images',
      image: '++id, name, blob',
    });
  }
}

export const dexieDb = new MdEditorDb();
