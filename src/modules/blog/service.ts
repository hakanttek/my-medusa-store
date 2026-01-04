import { InjectTransactionManager, MedusaService } from "@medusajs/framework/utils";
import { Post } from "./models/post";
import {
  InjectManager,
  MedusaContext,
} from "@medusajs/framework/utils"
import { Context } from "@medusajs/framework/types"
import { EntityManager } from "@medusajs/framework/mikro-orm/knex"
import { ClientService } from "./services";

type InjectedDependencies = {
  clientService: ClientService
}

type ModuleOptions = {
  capitalize?: boolean
}

export class BlogModuleService extends MedusaService({ Post }) {

  protected options_: ModuleOptions;

  protected clientService_: ClientService;

  constructor({ clientService }: InjectedDependencies, options?: ModuleOptions) {
    super(...arguments);
    this.options_ = options || {
      capitalize: false
    };

    this.clientService_ = clientService;
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