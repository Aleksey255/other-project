'use strict';

class Worker {
  constructor(name, surName, age, isChildren) {
    this.name = name;
    this.surName = surName;
    this.age = age;
    this.isChildren = isChildren;
  }
}

class Driver extends Worker {
  constructor(
    name,
    surName,
    age,
    isChildren,
    isLicenses = true,
    category,
    experience,
    position = 'Driver'
  ) {
    super(name, surName, age, isChildren);
    this.category = category;
    this.isLicenses = isLicenses;
    this.experience = experience;
    this.position = position;
  }
}
class Mechanic extends Worker {
  constructor(
    name,
    surName,
    age,
    isChildren,
    category,
    isLicenses = false,
    experience,
    position = 'Mechanic'
  ) {
    super(name, surName, age, isChildren);
    this.category = category;
    this.isLicenses = isLicenses;
    this.experience = experience;
    this.position = position;
  }
}

const driver = new Driver();

console.log(driver);
