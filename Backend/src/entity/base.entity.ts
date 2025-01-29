import { Model } from "mongoose";

export default class BaseEntity {
  constructor(protected modelName: Model<any>) {
    this.modelName = modelName;
  }

  async findOne(condition: any): Promise<any> {
    console.log(typeof condition, "--");
    return await this.modelName.findOne(condition);
  }
  async insertMany(payload: any[]): Promise<any> {
    console.log("inside insert many");
    return await this.modelName.insertMany(payload);
  }
  async findOneAndUpdate(condition: any, payload: any): Promise<any> {
    return await this.modelName.findOneAndUpdate(
      condition,
      { $set: payload },
      { new: true },
    );
  }
  async updateOne(condition: any, payload: any): Promise<any> {
    console.log("inside updateOne qeury");
    return await this.modelName.updateOne(condition, { $set: payload });
  }

  async updateArray(
    condition: any,
    payload: any,
    multi: boolean = false,
  ): Promise<any> {
    const updateOptions = multi ? { multi: true } : {};

    return await this.modelName.updateMany(condition, payload, updateOptions);
  }

  async deleteOne(condition: any): Promise<any> {
    return await this.modelName.deleteOne(condition);
  }

  async deleteById(id: any): Promise<any> {
    console.log(this.modelName);
    return await this.modelName.findByIdAndDelete(id);
  }
  async updateMany(condition: any, payload: any): Promise<any> {
    return await this.modelName.updateMany(condition, { $set: payload });
  }
  async create(data: any): Promise<any> {
    return await this.modelName.create(data);
  }
  async findById(id: any): Promise<any> {
    return await this.modelName.findById(id);
  }
  async find(condition: any) {
    return await this.modelName.find(condition);
  }
  async updateStatus(condition: any, payload: any) {
    return await this.modelName.findOneAndUpdate(
      condition,
      { $set: { status: payload } },
      { new: true },
    );
  }

  async remove(condition: any): Promise<any> {
    try {
      const updateResult = await this.modelName
        .updateOne({ _id: condition }, { $set: { status: 3 } })
        .exec();

      if (updateResult.modifiedCount && updateResult.modifiedCount > 0) {
        return { success: true };
      } else {
        return { success: false };
      }
    } catch (error) {
      throw error;
    }
  }
}
 