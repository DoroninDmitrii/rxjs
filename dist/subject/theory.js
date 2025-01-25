import { Subject } from "rxjs";
// const subject$ = new Subject();
// subject$.subscribe((value) => console.log('first', value));
// subject$.next(50);
// subject$.subscribe((value) => console.log('second', value));
// subject$.next(500);
/////////////
const subject$ = new Subject();
subject$.subscribe({
    next: (value) => { console.log('first', value); },
    error: (err) => { console.log('first', err); },
});
subject$.next(50);
subject$.error('error');
subject$.subscribe({
    next: (value) => { console.log('second', value); },
    error: (err) => { console.log('second', err); },
});
subject$.next(500);
