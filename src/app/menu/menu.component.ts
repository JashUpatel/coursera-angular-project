import { Component, OnInit } from '@angular/core';

// using DishService to pass the data to the component
// service are used to do logic part of the app and passing imp info req to component

import { Dish } from '../shared/dish';
// import { DISHES } from '../shared/dishes';

import { DishService } from '../services/dish.service';



@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  dishes: Dish[];
  // dishes = DISHES; both works same

  selectedDish: Dish;

  constructor(private dishService: DishService) { }

  ngOnInit(): void {
    this.dishes = this.dishService.getDishes();
  }

  onSelect(dish: Dish){
    this.selectedDish = dish;
  }

}
