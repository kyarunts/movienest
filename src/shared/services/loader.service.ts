import { BehaviorSubject } from "rxjs";
import { singleton } from "tsyringe";

@singleton()
export class LoaderService {
  public isLoading = new BehaviorSubject<boolean>(false);

  public start = () => {
    this.isLoading.next(true);
  };

  public finish = () => {
    this.isLoading.next(false);
  };
}