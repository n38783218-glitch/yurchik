import { isCorrectStatus, isNotEmpty } from '../utils';
import ItemService from './item.service';

export default class ItemController {
  constructor() {
    this.service = new ItemService();
  }
  async getItem(ctx) {
    const {id} = ctx.params
    await this.service.getOne(id);
    ctx.status = 201;
    ctx.body = {
      data: res,
    };
  }
  async getItems(ctx) {
    const {ids} = ctx.params
    await this.service.getAll(ids);
    ctx.status = 201;
    ctx.body = {
      data: res,
    };
  }
  async deleteItem(ctx) {
    const {id} = ctx.params
    await this.service.softDelete(id);
    ctx.status = 201;
    ctx.body = {
      data: res,
    };
  }
  async updateItem(ctx) {
    const { id } = ctx.params;
    const {
      name,
      properties,
      status,
      location_id,
      current_location_id,
      category_id,
    }
    const result = this.service.update()
    ctx.status = 201;
    ctx.body = {
      data: res,
    };
    return;
  }
  async createItem(ctx) {
    const {
      name,
      properties,
      status,
      location_id,
      current_location_id,
      category_id,
    } = ctx.request.body;
    if (
      this.#hasCorrectItem({
        name,
        properties,
        status,
        location_id,
        current_location_id,
        category_id,
      })
    ) {
      const result = this.service.create({});
      ctx.status = 201;
      ctx.body = {
        data: res,
      };
      return;
    }
    this.#throwUncorrectDataError(ctx);
  }

  #hasCorrectItem({
    name,
    properties,
    status,
    location_id,
    current_location_id,
    category_id,
  }) {
    return (
      isNotEmpty(name) ||
      isNotEmpty(properties) ||
      isNotEmpty(status) ||
      isCorrectStatus(EItemStatus, status) ||
      isNotEmpty(location_id) ||
      isNotEmpty(current_location_id) ||
      isNotEmpty(category_id)
    );
  }
  #throwUncorrectDataError(ctx) {
    ctx.status = 400;
    ctx.bory = {
      status: 400,
      message: 'Переданы неверные клиентские данные!',
    };
  }
}
