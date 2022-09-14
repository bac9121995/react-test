import { Model } from 'mongoose';
import { Inject, Injectable } from '@nestjs/common';
import { CommonConst } from '../../common.const';
import _ = require('lodash');

@Injectable()
export class TaskRepository {
  private readonly context = TaskRepository.name;
  constructor(
    @Inject(CommonConst.TASK_QUERY_MODEL_TOKEN)
    private readonly readModel: Model<any>,
  ) {}

  /**
   * Hàm lấy tất cả record theo điều kiện
   * @param query Điều kiện query
   * @param projection Các trường cần lấy ra
   * @returns
   */
  async findOne(query: any, projection = {}): Promise<any> {
    return await this.readModel.findOne(query, projection).lean().exec();
  }

  /**
   * Hàm lấy tất cả record theo điều kiện (Phân trang)
   * @param query Điều kiện query
   * @param projection Các trường cần lấy ra
   * @returns
   */
  async findAll(query: any = {}, projection = {}): Promise<any[]> {
    let project: any = { _id: 0 };
    if (!_.isEmpty(query._fields)) {
      const fields = query._fields.split(',');
      fields.forEach((f) => {
        project[f.trim()] = 1;
      });
      delete query._fields;
    }
    let sort: any = {
      index: 1,
    };

    if (query.isPaging) {
      const page = query.page;
      const pageSize = query.pageSize;
      delete query.isPaging;
      delete query.page;
      delete query.pageSize;
      return await this.readModel
        .find(query, projection)
        .sort(sort)
        .skip(page * pageSize - pageSize)
        .limit(pageSize)
        .lean()
        .exec();
    } else {
      return await this.readModel
        .find(query, projection)
        .sort(sort)
        .lean()
        .exec();
    }
  }

  /**
   * Hàm tạo mới bản ghi
   * @param model bản ghi
   * @returns
   */
  async create(model: any): Promise<any> {
    const countTask = await this.readModel.countDocuments({
      status: model.status,
    });
    model.index = countTask + 1;
    return await this.readModel.create(model);
  }

  async update(query: any, model: any): Promise<any> {
    return await this.readModel.update(query, model);
  }
}
