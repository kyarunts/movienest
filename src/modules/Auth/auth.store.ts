import { BehaviorSubject } from "rxjs";
import { singleton } from "tsyringe";

@singleton()
export class AuthStore {
  public signupState = new BehaviorSubject<string | null>('initial');
  
}