/*
https://docs.nestjs.com/providers#services
*/
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { asyncForEach } from "src/utils/conversation.util";
import { Repository } from "typeorm";
import { Sector } from "./sectors.entity";
@Injectable()
export class SectorsService {
  constructor(
    @InjectRepository(Sector)
    private readonly repository: Repository<Sector>
  ) {}
  async create(data: Sector): Promise<Sector> {
    try {
      const _data: any = { ...data };
      if (data.parent) {
        const parentData = await this.repository.findOne({
          where: { id: data.parent },
        });
        if (parentData) {
          _data.parent = parentData.id;
        } else {
          delete _data.parent;
        }
      }
      const afterInsert = await this.repository.insert(_data);
      return null;
    } catch (error) {
      return error;
    }
  }
  async filter(): Promise<any> {
    try {
      const dataArr: any = await this.repository.find();
      const finalArry: any[] = [];
      await asyncForEach(dataArr, (data) => {
        data.title = data?.title;
        data.value = data?.id;
        data.children = dataArr.filter((_filter) => {
          if (
            _filter.parent &&
            _filter.id != data.id &&
            _filter.parent == data.id
          ) {
            return _filter;
          }
        });
        if (data.parent == null) {
          finalArry.push(data);
        }
      });
      return finalArry;
    } catch (error) {
      return error;
    }
  }
}
