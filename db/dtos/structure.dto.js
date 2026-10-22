import { isString, isNotEmpty } from '../../utils.js';

export default class StructureDto {
  constructor({ name, address }) {
    this.name = name;
    this.address = address;
  }
  #checkObject() {
    return ['name', 'address'].every((p) => {
      return isString(this[p] && isNotEmpty(this[p]));
    });
  }
  get object() {
    if (!this.#checkObject())
      throw new Error('Try another data for this object!');
    return {
      name: this.name,
      address: this.address,
    };
  }
}
