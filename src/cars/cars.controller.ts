import { Controller, Get, Post, Param, ParseIntPipe, Body, Patch, Delete, ParseUUIDPipe, UsePipes, ValidationPipe } from '@nestjs/common';
import { CarsService } from './cars.service';
import { CreateCarDto, UpdateCarDto } from './dto/index';

@Controller('cars')
export class CarsController {

    constructor(
        private readonly carsService: CarsService
    ) {}

    @Get()
    getCars() {
        return this.carsService.findAll();
    }

    @Get(':id')
    getCarsById( @Param('id', ParseUUIDPipe ) id: string ) {
        return this.carsService.findById( id );
    }

    @Post()
    createCar( @Body() createCarDto: CreateCarDto) {
        return this.carsService.create( createCarDto );
    }

    @Patch(':id')
    updateCar(
        @Param('id', ParseUUIDPipe) id: string,
        @Body() updateCarDto: UpdateCarDto ) {
            return this.carsService.update( id, updateCarDto );
    }

    @Delete(':id')
    deleteCar( @Param('id', ParseUUIDPipe) id: string ) {
        return this.carsService.delete( id );
    }
}
