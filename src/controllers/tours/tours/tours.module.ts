import { Module } from '@nestjs/common';
import {ToursController} from "./tours.controller";
import {ToursService} from "../../../services/tours/tours.service";

@Module({
    imports: [],
    controllers: [ToursController],
    providers: [ToursService],
})
export class ToursModule {}
