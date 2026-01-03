
// Kiểu dữ liệu string
let myString: string = "Hello, TypeScript!";

// Kiểu dữ liệu number
let myNumber: number = 42;

// Kiểu dữ liệu boolean
let myBoolean: boolean = true;

// Kiểu dữ liệu bigint (phải có hậu tố 'n' cho các số lớn)
let myBigInt: bigint = 9007199254740991n;

// Kiểu dữ liệu undefined (thường sử dụng cho biến chưa được khởi tạo giá trị)
let myUndefined: undefined = undefined;

// Kiểu dữ liệu null
let myNull: null = null;

// Kiểu dữ liệu symbol (sử dụng cho các giá trị duy nhất)
let mySymbol: symbol = Symbol("uniqueIdentifier");

// Hiển thị các giá trị trên console
// console.log("String:", myString);
// console.log("Number:", myNumber);
// console.log("Boolean:", myBoolean);
// console.log("BigInt:", myBigInt);
// console.log("Undefined:", myUndefined);
// console.log("Null:", myNull);
// console.log("Symbol:", mySymbol);

// union type
let strOrNum: string | number | boolean = true;

if (strOrNum === true) {
    // console.log("strOrNum is a boolean");
}

// console.log(typeof strOrNum);

// object shape
type Company = { 
    name: string; 
    location: string;
    isPublic: boolean;
};

// allway const first
const google: Company = {
    name: "Google",
    location: "Silicon Valley",
    isPublic: true
};


// function
function add(x: number, y: number): number {
    return x + y;
}

// arrow function: ham mui ten

const addArrow = (x: number, y: number): number => {
    return x + y;
}



// class
class Cat {
    // name: string;
    // age!: number; chắc chắn khi dùng age sẽ có dữ liệu
    // age: number;

    constructor(readonly name: string, public age: number) {}

    eat(): void {
        console.log(`${this.name} is eating.`);
    }

    after1year(): void {
        this.age += 1;
    }
}

const myCat = new Cat("Bella", 2);
console.log(myCat, myCat.name, myCat.eat());

// abstract class: lop truu tuong
abstract class Animal {
    constructor(public name: string) {}
    
    eat() {
        console.log('...');

    }
}


class Dog extends Animal {
    eat(): void {
        console.log('veggie')
    }
}

const myDog: Animal = new Dog('sugar');
myDog.eat();


// framework
abstract class MyElement{
    abstract render(): string;
}

function engine(nodes: MyElement[]): string[] {
    return nodes.map(n => n.render());
}

// client
class ImageElement extends MyElement{
    render(): string {
        return 'image';
    }
}
    
class TextElement extends MyElement{
    render(): string {
        return 'Text';
    }
}

class Hypertext extends TextElement{
    // overide
    render(): string {
        return 'Hyper-text';
    }
}


const resul = engine([new ImageElement(), new TextElement(), new Hypertext()]);
console.log(resul);


// 
class CarEngine{
    public start() {
        this.stept1();
        this.stept2();
        this.stept3();
    }

    private stept1(){}
    private stept2(){}
    private stept3(){}
}

const myCarEngine = new CarEngine();
myCarEngine.start();

