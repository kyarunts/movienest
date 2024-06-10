import { BehaviorSubject } from "rxjs";
import { singleton } from "tsyringe";

@singleton()
export class ToastService {
  public toastMessage = new BehaviorSubject<{ type: 'error' | 'success', message: string; }>(null);

  private open = (type: 'error' | 'success', message: string) => {
    this.toastMessage.next({ type, message });
    setTimeout(() => {
      this.toastMessage.next(null);
    }, 3000);
  };

  public success = (message: string) => {
    this.open('success', message);
  };

  public error = (message: string) => {
    this.open('error', message);
  };
}