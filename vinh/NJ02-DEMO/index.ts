class Cat {
    constructor(readonly name: string, readonly age: number) {}

    eat(): void {
        console.log(`${this.name} is eating.`);
    }
}

const cat = new Cat("Whiskers", 3);
// console.log(cat, cat.name, cat.age, cat.eat());

abstract class Animal {
    constructor(readonly name: string) {}

    abstract eat():void;
}

class Dog extends Animal {
    eat(): void {
        console.log(`${this.name} is eating.`);
    }   
}

const myDog: Animal = new Dog("Buddy");
myDog.eat();
