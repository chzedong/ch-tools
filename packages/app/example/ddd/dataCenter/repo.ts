import { produce } from "immer";

export interface Data {
  id: number | string;
  [key: string]: any;
}

// DDD 数据访问层, 用于数据的增删改查, 专注于数据的操作，不关心业务逻辑
export class DataCenterRepo {

  private dataMap: Record<string, Data> = {};

  add(data: Data) {

    if(this.dataMap[data.id]) {
      throw new Error('Data already exist');
    }

    this.dataMap[data.id] = data;
  }

  remove(id: string | number) {
    delete this.dataMap[id];
  }

  // 更新数据
  save(id: string | number, cb: (data: Data) => void) {
    this.dataMap[id] = produce(this.dataMap[id], cb);
  }

  // 更新大数据，不使用immer, 用于性能优化
  saveBig(id: string | number, cb: (data: Data) => void) {
    cb(this.dataMap[id]);
  }

  // 获取数据
  get(id: string | number) {
    return this.dataMap[id];
  }
}
