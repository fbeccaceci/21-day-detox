import { EventEmitter } from "@/utils/event-emitter";
import { useEffect } from "react";

export function useEvent<T>(event: EventEmitter<T>, handler: (event: T) => void) {
  useEffect(() => {
    const sub = event.subscribe(handler);

    return () => {
      sub.unsubscribe();
    };
  }, []);
}
