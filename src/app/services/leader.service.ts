import { Injectable } from '@angular/core';
import { of, Observable } from 'rxjs';
import { delay } from 'rxjs/operators';

import { Leader } from '../shared/leader';
import { LEADERS } from '../shared/leaders';

@Injectable({
  providedIn: 'root'
})
export class LeaderService {

  constructor() { }

  getLeaders(): Observable<Leader[]> {

  // getLeaders(): Promise<Leader[]> {
    // return Promise.resolve(LEADERS);

    // return new Promise(resolve=>{
    //   // simulate server latency with 2s delay
    //   setTimeout(()=> resolve(LEADERS),
    //   2000)
    // })

    // return of(LEADERS).pipe(delay(2000)).toPromise();
    return of(LEADERS).pipe(delay(2000));
  
  }

  getLeader(id: string): Observable<Leader>{

  // getLeader(id: string): Promise<Leader>{
    // return Promise.resolve(LEADERS.filter((leader)=>(leader.id===id))[0]);
    // return new Promise(resolve=>{
    //   // simulate server latency with 2s delay
    //   setTimeout(()=> resolve(LEADERS.filter((leader)=>(leader.id===id))[0]),
    //   2000)
    // })

    // return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000)).toPromise();
    return of(LEADERS.filter((leader) => (leader.id === id))[0]).pipe(delay(2000));

  }

  getFeaturedLeader(): Observable<Leader>{

  // getFeaturedLeader(): Promise<Leader>{
    // return Promise.resolve(LEADERS.filter((leader)=>leader.featured)[0]);
    // return new Promise(resolve=>{
    //   // simulate server latency with 2s delay
    //   setTimeout(()=> resolve(LEADERS.filter((leader)=>leader.featured)[0]),
    //   2000)
    // })

    // return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000)).toPromise();
    return of(LEADERS.filter((leader) => leader.featured)[0]).pipe(delay(2000));

  }


}
