import { BehaviorSubject } from "rxjs";
import { singleton } from "tsyringe";

@singleton()
export class UserStore {
  public signupState = new BehaviorSubject<string | null>('initial');
  
}