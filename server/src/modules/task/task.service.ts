import { CreateTaskDTO } from "./request/create-task.dto";
/*
https://docs.nestjs.com/providers#services
*/
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { paginate, paginationOptions } from "src/utils/paginate.util";
import { In, Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { FilterTaskDTO } from "./request/filtertask.dto";
import { Sector } from "./sectors.entity";
import { Task } from "./task.entity";
import { TaskSector } from "./taskSector.entity";
@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
    @InjectRepository(Sector)
    private readonly sectorRepository: Repository<Sector>,
    @InjectRepository(TaskSector)
    private readonly taskSectorRepository: Repository<TaskSector>,
    private userService: UserService
  ) {}
  async filter(options: FilterTaskDTO): Promise<any> {
    try {
      const user: any = await this.userService.findById(options.userId);
      if (!user) {
        throw new Error("Invalid user");
      }
      const pOptions: any = paginationOptions(options);
      const where: any = {};
      if (options.userId) {
        where.user = options.userId;
      }
      const response = await this.repository
        .createQueryBuilder("task")
        .leftJoinAndSelect("task.user", "user")
        .leftJoinAndSelect("task.taskSectors", "taskSectors")
        .leftJoinAndSelect("taskSectors.sector", "sector")
        .orderBy("task.createdAt", "DESC")
        .where(where)
        .skip(pOptions.skip)
        .take(pOptions.take)
        .getManyAndCount();
      return paginate(pOptions, response);
    } catch (error) {
      throw new Error(error);
    }
  }
  async create(data: CreateTaskDTO): Promise<Task> {
    try {
      const sectors = await this.sectorRepository.findBy({
        id: In(data.sectors),
      });
      const user: any = await this.userService.findById(data.userId);
      if (!user) {
        throw new Error("Invalid user");
      }
      if (sectors.length !== data.sectors.length) {
        throw new Error("Invalid sector");
      }
      const task = await this.repository.insert({
        title: data.name,
        user: user?.id,
      });
      const taskSectors = data.sectors.map((sector) => {
        return {
          task: task.identifiers[0].id,
          sector,
        };
      });
      await this.taskSectorRepository.insert(taskSectors);
      return null;
    } catch (error) {
      return error;
    }
  }
  async update(id: string, data: CreateTaskDTO): Promise<Task> {
    try {
      const isExist = await this.repository.findOne({
        where: {
          id: id,
        },
      });
      if (isExist) {
        const sectors = await this.sectorRepository.findBy({
          id: In(data.sectors),
        });
        const user: any = await this.userService.findById(data.userId);
        if (!user) {
          throw new Error("Invalid user");
        }
        if (sectors.length !== data.sectors.length) {
          throw new Error("Invalid sector");
        }
        await this.repository.update(id, {
          title: data.name,
          user: user?.id,
        });
        await this.taskSectorRepository.delete({
          task: id,
        });
        const taskSectors = data.sectors.map((sector) => {
          return {
            task: id,
            sector,
          };
        });
        await this.taskSectorRepository.insert(taskSectors);
        return isExist;
      } else {
        throw new Error("Not found");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async delete(id: string): Promise<Task> {
    try {
      const isUserExist = await this.repository.findOne({
        where: {
          id: id,
        },
      });
      if (isUserExist) {
        await this.repository.delete(id);
        return isUserExist;
      } else {
        throw new Error("Not found");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
  async findById(id: string): Promise<Task> {
    try {
      const isExist = await this.repository.findOne({
        where: {
          id: id,
        },
        relations: ["user", "taskSectors", "taskSectors.sector"],
      });
      if (isExist) {
        return isExist;
      } else {
        throw new Error("Not found");
      }
    } catch (error) {
      throw new Error(error);
    }
  }
}
