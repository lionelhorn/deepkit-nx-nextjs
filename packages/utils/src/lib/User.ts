import {AutoIncrement, entity, MaxLength, MinLength, PrimaryKey, typeOf, validate} from "@deepkit/type";

@entity.name('user')
export class User {
	id: number & PrimaryKey & AutoIncrement = 0;
	username?: string & MaxLength<100> = "";
	first?: string;
	last?: string;
	age?: number;

	constructor() {
	}
}
