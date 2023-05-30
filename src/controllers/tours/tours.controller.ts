import {Controller, Delete, Get, Param, Post, UseGuards} from '@nestjs/common';
import {ToursService} from "../../services/tours/tours.service";
import {JwtAuthGuard} from "../../services/authentication/jwt-auth.guard/jwt-auth.guard.service";
import { Tour } from 'src/shemas/tour';
import {ITour} from "../../interfaces/tour";

@Controller('tours')
export class ToursController {
    constructor(private toursService: ToursService) {
    }

    @Post()
    initTours(): Promise<ITour[]> {
        return this.toursService.generateTours();

    }

    @Get()
    getAllTours(): Promise<Tour[]> {
        return this.toursService.getAllTours();
    }
    @UseGuards(JwtAuthGuard)
    @Get(":id")
    getTourById(@Param("id") id): Promise<Tour> {
        return this.toursService.getTourById(id);
    }

    @Delete()
    removeAllTours(): void {
        this.toursService.deleteTours();
    }
}
