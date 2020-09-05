import { Component, OnInit,Input, ViewChild } from '@angular/core';
import { Params, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { switchMap } from 'rxjs/operators';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { Dish } from '../shared/dish';
import { DishService } from '../services/dish.service';
import { Comment } from '../shared/comment';


@Component({
  selector: 'app-dishdetail',
  templateUrl: './dishdetail.component.html',
  styleUrls: ['./dishdetail.component.scss']
})
export class DishdetailComponent implements OnInit {
    // @Input()
    // dish: Dish;
// we will no longer get dish from click event instead use router 

  @ViewChild('cform') commentFormDirective;

  commentForm: FormGroup;

  comment: Comment;
  dish: Dish;
  dishIds: string[];
  prev: string;
  next: string;
  

  formErrors = {
    'author': '',
    'comment': '',
    
  };

  validationMessages = {
    'author': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      
    },
    'comment': {
      'required':      'comment is required.',
      'minlength':     'comment must be at least 2 characters long.',
      
    },
  };



  constructor(private dishservice: DishService,
    private route: ActivatedRoute,
    private location: Location,
    private fb: FormBuilder) {
      this.createForm();
     }

  ngOnInit(): void {

    // in angular route service provide set of observable
    // one is params to obtain paramater value in url
    // that paramter value is taken from :id
    // that colon variable is an observable and any change in its value will result in then action
    // snapshot from the route service is providing the value of the paramter
    // at that particular point of time and then making use of it in our app

    // const id = this.route.snapshot.params['id'];
    // // this.dishservice.getDish(id)
    // // .then(dish=> this.dish = dish);
    // this.dishservice.getDish(id)
    // .subscribe(dish=> this.dish = dish);

    // now we will make use of observable directly



    this.dishservice.getDishIds().subscribe(dishIds => this.dishIds = dishIds);
   
    // using params observable directly and modify it using switchmap operator
    // passing it through pipe  so when we get params observable 
    // we will getdish from the service which is map to the dish variable
    // we are fetching dish value from dish service ass an observable
    // then we subscribe to that observable to get value of the dish
    //  by using observable we can map it to other obserrvable
    // benefit will be suppose if we want to switch between the other dishes
    // we have to go back to menu and again passing id to dish detail compoenet
    // now we can navigate in list of dishes using dishids from getdishids methods that we included in dish service
    //getdishids is sending an observable so again we have to subscribe it to get dishids
    // with setprevnext method we can navigate betwn dishes
    // by including it in subscribe every time dishid is changed this method is also called
    // and next prev dish also get changed
    
    this.route.params.pipe(switchMap((params: Params) => this.dishservice.getDish(params['id'])))
    .subscribe(dish => { this.dish = dish; this.setPrevNext(dish.id); });

  
  }



  setPrevNext(dishId: string) {
    const index = this.dishIds.indexOf(dishId);
    this.prev = this.dishIds[(this.dishIds.length + index - 1) % this.dishIds.length];
    this.next = this.dishIds[(this.dishIds.length + index + 1) % this.dishIds.length];
  }

  goBack(): void {
    this.location.back();
  }

  createForm(){

    this.commentForm = this.fb.group({
      author: ['',[Validators.required, Validators.minLength(2)]],
      rating: 5,
      comment:['',[Validators.required, Validators.minLength(2)]],
      date:[ Date.now() ]

    });

    this.commentForm.valueChanges
    .subscribe(data => this.onValueChanged(data));

    this.onValueChanged();

  }

  onSubmit(){
    this.comment = this.commentForm.value;
    console.log(this.comment);
    // var d = new Date();

  this.commentForm.value.date=new Date().toISOString();

this.dish.comments.push(this.commentForm.value);

    this.commentForm.reset({
      author:'',
      rating:5,
      comment:'',
      date:Date.now()
    });

    this.commentForm.reset();
    this.commentFormDirective.resetForm();


  }

  onValueChanged(data?: any) {
    if (!this.commentForm) { return; }
    const form = this.commentForm;
    for (const field in this.formErrors) {
      if (this.formErrors.hasOwnProperty(field)) {
        // clear previous error message (if any)
        this.formErrors[field] = '';
        const control = form.get(field);
        if (control && control.dirty && !control.valid) {
          const messages = this.validationMessages[field];
          for (const key in control.errors) {
            if (control.errors.hasOwnProperty(key)) {
              this.formErrors[field] += messages[key] + ' ';
            }
          }
        }
      }
    }
  }






}

