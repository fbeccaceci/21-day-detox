export interface PublisherSub {
  unsubscribe(): void;
}

export interface Publisher<T> {
  value: T;
  subscribe(onChange: (newValue: T) => void): PublisherSub;
}
