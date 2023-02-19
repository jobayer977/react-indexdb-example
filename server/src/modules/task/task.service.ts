import { CreateTaskDTO } from "./request/create-task.dto";
/*
https://docs.nestjs.com/providers#services
*/
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { BaseFilterRequestDTO } from "src/base/base.request";
import { paginate, paginationOptions } from "src/utils/paginate.util";
import { In, Repository } from "typeorm";
import { Sector } from "./sectors.entity";
import { Task } from "./task.entity";
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>
  ) {}
  async filter(options: BaseFilterRequestDTO): Promise<any> {
    try {
      const pOptions: any = paginationOptions(options);
      const response = await this.repository.findAndCount({
        order: { createdAt: "ASC" },
        // where: {
        //   firstName: Raw(
        //     (alias) =>
        //       `LOWER(${alias}) Like '%${options.searchTerm.toLowerCase()}%'`
        //   ),
        //   lastName: Raw(
        //     (alias) =>
        //       `LOWER(${alias}) Like '%${options.searchTerm.toLowerCase()}%'`
        //   ),
        // },
        skip: pOptions.skip,
        take: pOptions.take,
        // relations: ["sectors"],
      });
      return paginate(pOptions, response);
    } catch (error) {
      throw new Error(error);
    }
  }
  async create(data: CreateTaskDTO): Promise<Task> {
    try {
      //find all the sectors by ids
      const task = await this.repository.create({
        title: data.name,
      });
      console.log(
        "🚀 ~ file: task.service.ts:50 ~ TaskService ~ create ~ task",
        task
      );
      if (data.sectors) {
        const sectors = await this.sectorRepository.findBy({
          id: In(data.sectors),
        });
        const pyalod = {
          title: data.name,
        };
        //create a new task with the sectors relation
        const task = await this.repository.create({
          title: data.name,
        });
        return sectors as any;
      }
    } catch (error) {
      return error;
    }
  }
}
