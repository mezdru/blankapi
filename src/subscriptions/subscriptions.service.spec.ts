import { Test, TestingModule } from "@nestjs/testing";
import { SubscriptionsService } from "./subscriptions.service";
import { STRIPE_CLIENT_TOKEN } from "@golevelup/nestjs-stripe";
import Stripe from "stripe";
import { createMock } from "@golevelup/ts-jest";

describe("SubscriptionsService", () => {
  const stripeClient = createMock<Stripe>();
  let service: SubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionsService,
        {
          provide: STRIPE_CLIENT_TOKEN,
          useValue: stripeClient,
        },
      ],
    }).compile();

    service = module.get<SubscriptionsService>(SubscriptionsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it("should create a checkout session", async () => {
    const mockCheckoutSession = {
      id: "123",
    };

    (stripeClient.checkout.sessions.create as jest.Mock).mockResolvedValue(
      mockCheckoutSession
    );

    const session = await service.createSubscriptionSession(
      { priceId: "priceId" },
      "customerId"
    );

    expect(stripeClient.checkout.sessions.create).toHaveBeenNthCalledWith(1, {
      cancel_url: "undefined",
      success_url: "undefined?session_id={CHECKOUT_SESSION_ID}",
      mode: "subscription",
      line_items: [
        {
          price: "priceId",
          quantity: 1,
        },
      ],
      customer: "customerId",
    });

    expect(session).toEqual(mockCheckoutSession);
  });

  it("should create a billing portal session", async () => {
    (stripeClient.billingPortal.sessions.create as jest.Mock).mockResolvedValue(
      {
        id: "123",
      }
    );

    const result = await service.getPortal("customerId");

    expect(stripeClient.billingPortal.sessions.create).toHaveBeenNthCalledWith(
      1,
      {
        customer: "customerId",
      }
    );

    expect(result).toEqual({ id: "123" });
  });
});
