import { Body, Controller, Get, Param, Post, UseInterceptors } from "@nestjs/common";
import { ToursService} from "../../../services/tours/tours.service";
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ITourClient} from '../../../interfaces/tour';
import { Tour } from '../../../shemas/tour'

@Controller('tour-item')
export class TourItemController {
    constructor(private toursService: ToursService) {}
    static imgName: string;

    @Post()
    @UseInterceptors(
        FileInterceptor('img', {
            storage: diskStorage({
                destination: './public',
                filename(req, file, cb) {
                    const imgType = file.mimetype.split('/');
                    const uniqueSuffix =
                        Date.now() + '_' + Math.round(Math.random() * 1e9);
                    const imgName =
                        file.fieldname + '_' + uniqueSuffix + '.' + imgType[1];
                    cb(null, imgName);
                    TourItemController.imgName = imgName;
                },
            }),
        }),
    )
    initTours(@Body() body: ITourClient): void {
        body.img = TourItemController.imgName;
        this.toursService.uploadTour(body);
    }
    @Get(':name/:tourOperator')
    getToursByName(@Param() param): Promise<Tour[]> {
        console.log('tour data', param.name);
        console.log('tour data ', param.tourOperator);
        return this.toursService.getToursByName(param.name, param.tourOperator);
    }

    @Get(':data')
    getTourBySearchInput(@Param() param): Promise<Tour> {
        console.log(param);
        return this.toursService.getTourBySearchInput(param.data);
    }
}
