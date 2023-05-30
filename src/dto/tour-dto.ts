import {ITour} from "../interfaces/tour";

export class TourDto implements ITour {
    name:string;
    description:string;
    tourOperator:string;
    price:string;
    img:string;
    id:string;
    type: string;
    date: string;

    constructor(name, description, tourOperator, price, type, date, img) {
        this.name = name;
        this.description = description;
        this.tourOperator = tourOperator;
        this.price = price;
        this.type = type;
        this.date = date;
        this.img = img;
    }
}