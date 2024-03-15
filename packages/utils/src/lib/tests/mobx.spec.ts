import {describe, expect, test} from "vitest";
import { makeAutoObservable, makeObservable, observable } from "mobx";
import { ReflectionKind, typeOf } from "@deepkit/type";
import { FormDebugContextType } from '../FormDebugOptions';
import { Input } from '../DeepkitDecorators';


describe("mobx observable", () => {
  test("mobx observable: type inside test", () => {
    class FormDebugOptions {
      showRegistrationOptions: boolean = false;
      showRegMatchResult: boolean = false;
      showIsParentObjectLiteral: boolean = false;
      showPrettyTypes: boolean = false;
      showCrumbs: boolean = false;

      constructor() {
        makeAutoObservable(this);
      }
    }

    class FormDebugContextType {
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

    const root = new FormDebugContextType();
    const t = typeOf<FormDebugContextType>();
    expect(t.kind).toEqual(ReflectionKind.class);
    // PASSES : t.kind: 20
  });

  test("mobx observable: type def in external file", () => {
    const root = new FormDebugContextType();
    const t = typeOf<FormDebugContextType>();
    expect(t.kind).toEqual(ReflectionKind.class);
    // FAILS: t.kind: 0
  });
})
