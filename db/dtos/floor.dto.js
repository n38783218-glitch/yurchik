import { isString, isNotEmpty, isNumber } from '../../utils.js';

export default class FloorDto {
  constructor({ name, structure_id }) {
    this.name = name;
    this.structure_id = structure_id;
  }
  #checkObject() {
    if (isString(this.name) && isNumber(this.structure_id)) {
      if (isNotEmpty(this.name) && isNotEmpty(this.structure_id)) {
        return true;
      }
      return false;
    }
    return false;
  }
  get object() {
    if (!this.#checkObject())
      throw new Error('Try another data for this object!');
    return {
      name: this.name,
      structure_id: this.structure_id,
    };
  }
}
