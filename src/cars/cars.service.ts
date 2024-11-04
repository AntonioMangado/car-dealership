import { Injectable, NotFoundException } from '@nestjs/common';
import { Car } from './interfaces/car.interface';
import { v4 as uuid } from 'uuid';
import { CreateCarDto, UpdateCarDto } from './dto/index';

@Injectable()
export class CarsService {
    private cars: Car[] = [
        // {
        //     id: uuid(),
        //     brand: 'Ford',
        //     model: 'Fiesta'
        // },
    ]

    findAll() {
        return this.cars;
    }

    findById( id: string ) {
        const car = this.cars.find( car => car.id === id );

        if ( !car )
            throw new NotFoundException(`Car with id ${id} not found`);

        return car;
    }

    create( createCarDto: CreateCarDto ) {

        const newCar = {
            id: uuid(),
            ...createCarDto
        }

        this.cars.push( newCar );

        return newCar;
    }

    update( id: string, updateCarDto: UpdateCarDto ) {
        let carDB = this.findById( id );

        this.cars = this.cars.map(car => {
            if ( car.id === id ) {
                carDB = {
                    ...carDB,
                    ...updateCarDto
                }
                return carDB;
            }
            return car;
        })
        return carDB;
    }

    delete( id: string ) {
        this.cars = this.cars.filter(car => car.id !== id);
        return { message: `Car with id ${id} deleted` };
    }

    fillCarsWithSeedData( cars: Car[] ) {
        this.cars = cars
    }
}
