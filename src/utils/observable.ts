import { Publisher, PublisherSub } from "./publisher";

export class Observable<T> implements Publisher<T> {
  private _value: T;

  private subscribers: Set<(newValue: T) => void> = new Set();

  constructor(value: T) {
    this._value = value;
  }

  get value() {
    return this._value;
  }

  set value(newValue: T) {
    this._value = newValue;
    this.notify();
  }

  subscribe(onChange: (newValue: T) => void): PublisherSub {
    this.subscribers.add(onChange);
    onChange(this._value);
    return {
      unsubscribe: () => this.unsubscribe(onChange),
    };
  }

  private unsubscribe(onChange: (newValue: T) => void) {
    this.subscribers.delete(onChange);
  }

  private notify() {
    this.subscribers.forEach((onChange) => onChange(this._value));
  }

  eraseToPublisher(): Publisher<T> {
    return this;
  }
}
