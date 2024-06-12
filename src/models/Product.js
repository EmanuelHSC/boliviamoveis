export class Product {
    constructor(id, name, description, image, price) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.image = image;
        this.price = price;
    }

    getId = () => this.id;
    getName = () => this.name;
    getDescription = () => this.description;
    getImage = () => this.image;
    getPrice = () => this.price;
}

