import { Component, OnInit, OnDestroy } from '@angular/core';
import { interval, Subscription, Observable } from 'rxjs';
import { map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubsc: Subscription;

  constructor() { }

  ngOnInit() {
    // this.firstObsSubsc = interval(1000).subscribe(count => {
    //   console.log(count);
    // });

    // custom version:

    const customIntervalObservable = Observable.create(observer => {
      let count = 0;
      setInterval(() => {
        observer.next(count);
        if (count == 3) {
          observer.complete();
        }
        if (count > 4) {
          observer.error(new Error('Count is greater then 3!'));
        }
        count++;
      },1000)
    });

    this.firstObsSubsc = customIntervalObservable.pipe(filter(data => {
      return data > 0;
    }), map((data: number) => {
      return 'Round: ' + (data + 1);
    })).subscribe(data => {
      console.log(data);
    }, error => {
      console.log(error);
      alert(error.message);
    }, () => {
      console.log('Completed!');
    });
  }

  ngOnDestroy(): void {
    this.firstObsSubsc.unsubscribe();
  }

}
