export interface EventEmitterSub {
  unsubscribe(): void;
}

export class EventEmitter<T> {
  private subscribers: Set<(event: T) => void> = new Set();

  subscribe(handler: (event: T) => void): EventEmitterSub {
    this.subscribers.add(handler);
    return {
      unsubscribe: () => this.unsubscribe(handler),
    };
  }

  private unsubscribe(onChange: (newValue: T) => void) {
    this.subscribers.delete(onChange);
  }

  emit = (event: T) => {
    this.subscribers.forEach((handler) => handler(event));
  };
}
