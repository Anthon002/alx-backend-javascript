/**
 * This module represents the Holberton Course.
 */
export default class HolbertonCourse {
  /**
   * Holberton class 
   *
   * @param {String} name - course name
   * @param {Number} length - course duration
   * @param {String[]} students - students
   */
  constructor(name, length, students) {
    this.name = name;
    this.length = length;
    this.students = students;
  }

  /**
   * getter for name
   */
  get name() {
    return this._name;
  }

  /**
   * setter for name
   */
  set name(value) {
    if (typeof value !== 'string') {
      throw new TypeError('Name must be a string');
    }
    this._name = value;
  }

  /**
   * Getter for length
   */
  get length() {
    return this._length;
  }

  /**
   * Setter for the length
   */
  set length(value) {
    if (typeof value !== 'number') {
      throw new TypeError('Length must be a number');
    }
    this._length = value;
  }

  /**
   * Getter for the students
   */
  get students() {
    return this._students;
  }

  /**
   * Setter for the students
   */
  set students(value) {
    if (!(value instanceof Array)) {
      throw new TypeError('Students must be an array of strings');
    }
    if (!value.every((student) => typeof student === 'string')) {
      throw new TypeError('Students must be an array of strings');
    }
    this._students = value;
  }
}
