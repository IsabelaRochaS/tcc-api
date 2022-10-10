import { Type } from "@nestjs/common/interfaces/type.interface";
import { InjectRepository } from "@nestjs/typeorm";
import {
  EntityManager,
  FindConditions,
  Repository,
  TransactionManager,
} from "typeorm";

export interface IBaseRepositoryController<T> {
  readonly repository: Repository<T>;
  save: (data: Partial<any>, transactionManager?: EntityManager) => Promise<T>;
  saveAll: (
    data: Partial<any>[],
    transactionManager?: EntityManager
  ) => Promise<any & T>;
  findById: (id: string) => Promise<T | undefined>;
  findByConditions: (findConditions: FindConditions<any>) => Promise<T[]>;
  findAll: () => Promise<T[]>;
  findOneByConditions: (
    findConditions: FindConditions<any>
  ) => Promise<T | undefined>;
  deleteById: (id: string, transactionManager?: EntityManager) => Promise<void>;
  deleteByConditions: (
    findConditions: FindConditions<any>,
    transactionManager?: EntityManager
  ) => Promise<void>;
}

type Constructor<I> = new (...args: any[]) => I;

export function BaseRepositoryController<T>(
  entity: Constructor<T>
): Type<IBaseRepositoryController<T>> {
  class BaseRepository implements IBaseRepositoryController<T> {
    @InjectRepository(entity) public readonly repository!: Repository<T>;
    public readonly entity!: Constructor<T>;

    public async save(
      data: Partial<any>,
      @TransactionManager() transactionManager?: EntityManager
    ): Promise<T> {
      if (transactionManager) {
        return transactionManager.save(entity, data);
      }
      return this.repository.save(data);
    }

    public async saveAll(
      data: Partial<any>[],
      @TransactionManager() transactionManager?: EntityManager
    ): Promise<any & T> {
      if (transactionManager) {
        return transactionManager.save(entity, data);
      }
      return this.repository.save(data);
    }

    public async findById(id: string): Promise<T | undefined> {
      return this.repository.findOne({
        where: {
          id,
        },
      });
    }

    public async findAll(): Promise<T[]> {
      return this.repository.find();
    }

    public async findByConditions(
      findConditions: FindConditions<any>
    ): Promise<T[]> {
      return this.repository.find(findConditions);
    }

    public async findOneByConditions(
      findConditions: FindConditions<any>
    ): Promise<T | undefined> {
      return this.repository.findOne(findConditions);
    }

    public async deleteById(
      id: string,
      @TransactionManager() transactionManager?: EntityManager
    ): Promise<void> {
      if (transactionManager) {
        await transactionManager.delete(entity, id);
      } else {
        await this.repository.delete(id);
      }
    }

    public async deleteByConditions(
      findConditions: FindConditions<any>,
      @TransactionManager() transactionManager?: EntityManager
    ): Promise<void> {
      if (transactionManager) {
        await transactionManager.delete(entity, findConditions);
      } else {
        await this.repository.delete(findConditions);
      }
    }
  }
  return BaseRepository;
}
