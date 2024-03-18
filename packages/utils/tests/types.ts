import {AutoIncrement, cast, entity, MinLength, Positive, PrimaryKey} from "@deepkit/type";

@entity.name("Person")
export class Person {
  id: number & PrimaryKey & AutoIncrement = 0;
  firstName?: string & MinLength<2>;
  lastName?: string;
  age?: number & Positive;

  static createDummy(){
    const p = new Person();
    p.firstName = "John";
    p.lastName = "Doe";
    p.age = 42
    return p;
  }
}
