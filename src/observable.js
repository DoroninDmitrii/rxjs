const { Observable } = require("rxjs");

// const observable$ = new Observable(observer => {
//   observer.next(1);
//   observer.complete();
//   observer.next(2);
//   // undefined.toString();
//   observer.next(3);
// });

// const subscription = observable$.subscribe({
//   next: (value) => { console.log(value) },
//   error: () => { console.log('error') },
//   complete: () => { console.log('complete') }
// });

// const observable$ = new Observable(observer => {
//   setTimeout(() => observer.next(1), 1000);
//   setTimeout(() => observer.next(2), 2000);
//   setTimeout(() => observer.next(3), 3000);
// });

// const subscription = observable$.subscribe({
//   next: (value) => { console.log(value) },
//   error: () => { console.log('error') },
//   complete: () => { console.log('complete') }
// });

// setTimeout(() => subscription.unsubscribe(), 2000);

//cold observable

const observable$ = new Observable(observer => {
  setTimeout(() => observer.next(1), 1000);
  setTimeout(() => observer.next(2), 2000);
  setTimeout(() => observer.next(3), 3000);
});

const subscription = observable$.subscribe((value) => { console.log(value) });
setTimeout(() => observable$.subscribe((value) => { console.log('second observer', value) }), 3000);

setTimeout(() => subscription.unsubscribe(), 2000);


