import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Order, OrderDocument} from "../../shemas/order";
import { Model, Promise } from 'mongoose';
import { OrderDto } from '../../dto/order-dto';
import { IOrder } from '../../interfaces/order';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(Order.name) private orderModel: Model<OrderDocument>,
    ) {}
    async sendOrder(data: OrderDto): Promise<Order> {
        const orderData = new this.orderModel(data);
        return orderData.save();
    }

    async getOrdersByUserId(userId): Promise<IOrder[]> {
        return this.orderModel.find({ userId: userId });
    }

    async getAllOrders(): Promise<IOrder[]> {
        return this.orderModel.find();
    }
}
