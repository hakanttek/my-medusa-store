import { InjectTransactionManager, MedusaService } from "@medusajs/framework/utils";
import { Post } from "./models/post";
import {
  InjectManager,
  MedusaContext,
} from "@medusajs/framework/utils"
import { Context } from "@medusajs/framework/types"
import { EntityManager } from "@medusajs/framework/mikro-orm/knex"

type ModuleOptions = {
  capitalize?: boolean
}

export class BlogModuleService extends MedusaService({ Post }) {

  protected options_: ModuleOptions;

  constructor({ }, options?: ModuleOptions) {
    super(...arguments);
    this.options_ = options || {
      capitalize: false
    };
  }

  @InjectTransactionManager()
  protected async update_(
    input: {
      id: string,
      name: string
    },
    @MedusaContext() sharedContext?: Context<EntityManager>
  ): Promise<any> {
    const transactionManager = sharedContext?.transactionManager

    // TODO: update the record
  }

  @InjectManager()
  async update(
    input: {
      id: string,
      name: string
    },
    @MedusaContext() sharedContext?: Context<EntityManager>
  ) {
    return await this.update_(input, sharedContext)
  }

  @InjectManager()
  async getCount(
    tableName: string,
    @MedusaContext() sharedContext?: Context<EntityManager>): Promise<number | undefined> {
    return await sharedContext?.manager?.count(tableName)
  }
}