import { Subject } from "rxjs";

class NotificationService {
  private notificationSubject = new Subject<string>();

  get notifications$() {
    return this.notificationSubject.asObservable();
  }

  sendNotification(message: string) {
    this.notificationSubject.next(message);
  }
}

const notificationService = new NotificationService();

notificationService.notifications$.subscribe((message) => {
  console.log('Logger:', message);
})

notificationService.notifications$.subscribe((message) => {
  console.log("UI Notification:", message);
});

notificationService.sendNotification("User logged in.");
notificationService.sendNotification("New message received.");
notificationService.sendNotification("Error: Unable to fetch data.");




