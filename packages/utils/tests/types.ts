import {AutoIncrement, cast, entity, MinLength, Positive, PrimaryKey} from "@deepkit/type";

@entity.name("Person")
export class Person {
  id: number & PrimaryKey & AutoIncrement = 0;
  firstName!: string & MinLength<2>;
  lastName!: string;
  age!: number & Positive;
}

export const person = cast<Person>({
  firstName: "John",
  lastName: "Doe",
  age: 30
} as Person);
