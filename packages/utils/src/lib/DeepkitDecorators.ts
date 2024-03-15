import { metaAnnotation, Type } from "@deepkit/type";


export type InputDecoratorType = { label?: string, description?: string }
export type Input<I extends InputDecoratorType> = { __meta?: ["inputAnnotation", I] };

export function getInputAnnotations(type: Type) {
  return metaAnnotation.getForName(type, "inputAnnotation") ?? [];
}

