let message1: string = "Hello";
message1 = "bye";
console.log(message1);
let age1: number = 30;

console.log(age1);
let isActive1 : boolean = true;

let numberes1: number[] = [1, 2, 3,4];

let data: any = "This could be anything";

data = 42;

function add(a: number, b: number): number {
 
    return a +  b;

}

add(2,3);
console.log(add(2,3));

let user: {
name: string;
age: number;
isActive: boolean;
} = {
  name: "Alice",
  age: 30,
  isActive: true
};

