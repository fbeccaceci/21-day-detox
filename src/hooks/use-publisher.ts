import { useSyncExternalStore } from "react";

import { Publisher } from "@/utils/publisher";

export function usePublisher<T>(publisher: Publisher<T>) {
  const subFunction = (onChange: () => void) => {
    const sub = publisher.subscribe(onChange);

    return () => {
      sub.unsubscribe();
    };
  };

  const getSnapshot = () => {
    return publisher.value;
  };

  return useSyncExternalStore<T>(subFunction, getSnapshot);
}

export function usePublishers<T extends Publisher<any>[]>(
  publishers: [...T]
): { [K in keyof T]: T[K] extends Publisher<infer U> ? U : never } {
  return publishers.map((p) => usePublisher(p)) as any;
}
