import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Promotion } from '../shared/promotion';
import { PROMOTIONS } from '../shared/promotions';


@Injectable({
  providedIn: 'root'
})
export class PromotionService {

  constructor() { }

  getPromotions(): Observable<Promotion[]> {

  // getPromotions(): Promise<Promotion[]> {
    // return Promise.resolve(PROMOTIONS);
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(PROMOTIONS),
    //   2000)
    // })

    // return of(PROMOTIONS).pipe(delay(2000)).toPromise();
    return of(PROMOTIONS).pipe(delay(2000));
  
  }

  getPromotion(id: string): Observable<Promotion> {

  // getPromotion(id: string): Promise<Promotion> {
    // return Promise.resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]);
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(PROMOTIONS.filter((promo) => (promo.id === id))[0]),
    //   2000)
    // })

    // return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000)).toPromise();
    return of(PROMOTIONS.filter((promo) => (promo.id === id))[0]).pipe(delay(2000));
  
  }

  getFeaturedPromotion(): Observable<Promotion> {

  // getFeaturedPromotion(): Promise<Promotion> {
    // return Promise.resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]);
    // return new Promise(resolve => {
    //   setTimeout(()=> resolve(PROMOTIONS.filter((promotion) => promotion.featured)[0]),
    //    2000)
    // })

    // return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000)).toPromise();
    return of(PROMOTIONS.filter((promotion) => promotion.featured)[0]).pipe(delay(2000));
  
  }

}
