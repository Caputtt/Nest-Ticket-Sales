import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Promise } from 'mongoose';
import { Tour, TourDocument} from "../../shemas/tour";
import { TourDto } from '../../dto/tour-dto';
import { ITour, ITourClient } from '../../interfaces/tour';
import { rawToursArr } from '../../assets/rawTour';


@Injectable()
export class ToursService {
    private toursCount = rawToursArr.length;

    //private toursCount = 5;
    constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>) {}
    rawTour = rawToursArr;

    //тестовый метод для заполнения базы данных туров
    async getAllTours(): Promise<Tour[]> {
        return this.tourModel.find();
    }
    async generateTours(): Promise<ITour[]> {
        console.log(this.toursCount)
        for (let i = 0; i < this.toursCount; i++) {
            const tour = new TourDto(
                this.rawTour[i].name,
                this.rawTour[i].description,
                this.rawTour[i].tourOperator,
                this.rawTour[i].price,
                this.rawTour[i].type,
                this.rawTour[i].date,
                this.rawTour[i].img,
            );
            const tourData = new this.tourModel(tour);
            await tourData.save();
        }
        return this.getAllTours();
    }

    async getTourById(id): Promise<Tour> {
        const dataTour = await this.tourModel.findById(id);
        console.log('тур ', dataTour);
        return dataTour;
    }

    async deleteTours(): Promise<any> {
        return this.tourModel.deleteMany({});
    }
    async getToursByName(name, operator): Promise<ITour[]> {
        return this.tourModel.find({
            $or: [{ name: name }, { tourOperator: operator }],
        });
    }

    async uploadTour(body: ITourClient) {
        const tour = new TourDto(
            body.name,
            body.description,
            body.tourOperator,
            body.price,
            body.type,
            body.date,
            body.img,
        );
        const tourData = new this.tourModel(tour);
        await tourData.save();
    }

    async getTourBySearchInput(data) {
        return this.tourModel.findOne({
            $or: [{ name: { $regex: data, $options: 'i' } }, { description: { $regex: data, $options: 'i' } }],
        });
    }
}
