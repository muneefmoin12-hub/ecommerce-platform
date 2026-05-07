export class OrderCreatedEvent {
  constructor(public readonly orderId: string, public readonly userId: string | null) {}
}

export class OrderStatusChangedEvent {
  constructor(
    public readonly orderId: string,
    public readonly previousStatus: string,
    public readonly newStatus: string,
  ) {}
}
