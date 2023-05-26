import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    HttpStatus,
    Param,
    Post,
    Put,
    Query,
    UseGuards
} from '@nestjs/common';
import {UsersService} from "../../services/users/users.service";
import {User} from "../../shemas/user";
import {UserDto} from "../../dto/user-dto";
import RejectedValue = jest.RejectedValue;
import {AuthGuard} from "@nestjs/passport";
import { JwtAuthGuard } from 'src/services/authentication/jwt-auth.guard/jwt-auth.guard.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService) {}

    // @Get()
    // getAllUsers(@Query() param): string {
    //     console.log('param', param)
    //     return param.id;
    // }

    @Get()
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get(":id")
    getUserById(@Param('id') id): Promise<User> {
        return this.userService.getUserById(id);
    }

    // @UseGuards(JwtAuthGuard)
    @Post()
    sendUser(@Body() data: UserDto): Promise<User> {

        return this.userService.checkRegUser(data.login).then((queryRes) => {
            console.log('data reg', queryRes)
            if (queryRes.length === 0) {
                return this.userService.sendUsers(data);
            } else {
                console.log('err - user is exists')
                throw new HttpException({
                    status: HttpStatus.CONFLICT,
                    errorText: 'Пользователь уже зарегистрирован',
                }, HttpStatus.CONFLICT);
            }
        });

    }

    @UseGuards(AuthGuard('local'))
    @Post(":login")
    authUser(@Body() data: UserDto, @Param('login') login): any {
        return this.userService.login(data);
    }

    //     Promise<User | boolean> {
    //     return this.userService.checkAuthUser(data.login, data.psw).then((queryRes) => {
    //             if (queryRes.length !== 0) {
    //                 return Promise.resolve(true);
    //             } else {
    //                 console.log('err - user is exists')
    //                 throw new HttpException({
    //                     status: HttpStatus.CONFLICT,
    //                     errorText: 'Пользователь не найден в базе данных',
    //                 }, HttpStatus.CONFLICT);
    //             }
    //         }
    //     );
    // }

    @Put(":id")
    updateUsers(@Param('id') id, @Body() data): Promise<User> {
        return this.userService.updateUsers(id, data);
    }

    @Delete()
    deleteUsers(): Promise<User> {
        return this.userService.deleteUsers();
    }

    @Delete(":id")
    deleteUserById(@Param('id') id): Promise<User>  {
        return this.userService.deleteUserById(id);
    }
}
