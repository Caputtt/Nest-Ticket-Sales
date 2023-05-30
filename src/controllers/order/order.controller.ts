import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrderService } from '../../services/order/order.service';
import { Order} from "../../shemas/order";
import { OrderDto } from '../../dto/order-dto';

@Controller('orders')
export class OrderController {
    constructor(private orderService: OrderService) {}
    @Post()
    initTours(@Body() data: Order) {
        const orderData = new OrderDto(
            data.age,
            data.birthDay,
            data.cardNumber,
            data.tourId,
            data.userId,
        );
        this.orderService.sendOrder(orderData);
    }

    @Get()
    getAllOrder(): Promise<Order[]> {
        return this.orderService.getAllOrders();
    }
    @Get(':id')
    getOrdersByUserId(@Param() param): Promise<Order[]> {
        return this.orderService.getOrdersByUserId(param.id);
    }
}
