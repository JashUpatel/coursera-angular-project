import { Injectable } from '@angular/core';
import { Dish } from '../shared/dish';
import { DISHES } from '../shared/dishes';
// import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class DishService {

  constructor() { }


  getDishes(): Observable<Dish[]> {

  // getDishes(): Promise<Dish[]> {
    // return Promise.resolve(DISHES);  // to show the delay in promise
   
    // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES), 2000);
    // });

    // again converting into observable for reactive programming using rxjs lib
    // here converted observable into promise using to promise method

    // return of(DISHES).pipe(delay(2000)).toPromise();

    return of(DISHES).pipe(delay(2000));

    // now we will return observables directly to component from the service 
    // instead of converting the observable into promise and then return it to component
    // HTTP method in angular returns observables 
    // whatever a promise can do observable can also do



  }


  getDish(id: string): Observable<Dish>{

  // getDish(id: string): Promise<Dish>{
    // return Promise.resolve(DISHES.filter((dish) => (dish.id === id))[0]);
   
    // return new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES.filter((dish) => (dish.id === id))[0]), 2000);
    // });

    // return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000)).toPromise();
    return of(DISHES.filter((dish) => (dish.id === id))[0]).pipe(delay(2000));
  
  }

  getFeaturedDish(): Observable<Dish>{

  // getFeaturedDish(): Promise<Dish>{
    // return Promise.resolve(DISHES.filter((dish) => dish.featured)[0]);
   
    // return  new Promise(resolve=> {
    //   // Simulate server latency with 2 second delay
    //     setTimeout(() => resolve(DISHES.filter((dish) => dish.featured)[0]), 2000);
    // });


    // return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000)).toPromise();
    return of(DISHES.filter((dish) => dish.featured)[0]).pipe(delay(2000));
  
  }

  getDishIds(): Observable<string[] | any> {
    return of(DISHES.map(dish => dish.id ));
  }
}
