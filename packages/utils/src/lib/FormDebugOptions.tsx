import { makeAutoObservable, makeObservable, observable } from "mobx";
import { Input } from './DeepkitDecorators';

export class FormDebugOptions {
  showRegistrationOptions: boolean = false;
  showRegMatchResult: boolean = false;
  showIsParentObjectLiteral: boolean = false;
  showPrettyTypes: boolean = false;
  showCrumbs: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }
}

export class FormDebugContextType {
  crumbsDisplayed?: Array<string>;
  debugOptions?: FormDebugOptions & Input<{ label: "Options" }>;

  constructor() {
    this.crumbsDisplayed = new Array<string>();
    this.debugOptions = new FormDebugOptions();
    makeObservable(this, {
      debugOptions: observable
    });
  }
}
