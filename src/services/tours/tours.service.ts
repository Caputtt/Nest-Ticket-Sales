import { Injectable } from '@nestjs/common';
import {InjectModel} from "@nestjs/mongoose";
import {Tour, TourDocument} from "../../shemas/tour";
import {Model} from "mongoose";
import { TourDto } from 'src/dto/tour-dto';
import {name} from "ts-jest/dist/transformers/hoist-jest";
import {ITour} from "../../interfaces/tour";


@Injectable()
export class ToursService {
    private toursCount = 10;

    constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {

    }

    async generateTours(): Promise<any> {
        for (let i = 0; i <= this.toursCount; i++) {
            const tour = new TourDto('test'+i,
                'test desc',
                'test operator',
                '300+i',
                'ocean.jpg');
            const tourData = new this.tourModel(tour);
            await tourData.save();
        }
        return this.generateTours();

    }

    async deleteTours(): Promise<any> {
        return this.tourModel.deleteMany({})
    }

    async getAllTours(): Promise<ITour[]> {
        return this.tourModel.find()
    }

}
