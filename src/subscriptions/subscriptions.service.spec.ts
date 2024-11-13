import { Test, TestingModule } from '@nestjs/testing';
import { SubscriptionsService } from './subscriptions.service';
import { STRIPE_CLIENT_TOKEN } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';

const mockCreateCheckoutSession = jest.fn();
const mockCreateBillingPortalSession = jest.fn();

const MockStripeClient = {
  checkout: {
    sessions: {
      create: mockCreateCheckoutSession,
    },
  },
  billingPortal: {
    sessions: {
      create: mockCreateBillingPortalSession,
    },
  },
} as unknown as Stripe;

describe('SubscriptionsService', () => {
  let service: SubscriptionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SubscriptionsService,
        {
          provide: STRIPE_CLIENT_TOKEN,
          useValue: MockStripeClient,
        },
      ],
    }).compile();

    service = module.get<SubscriptionsService>(SubscriptionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a checkout session', async () => {
    const mockCheckoutSession = {
      id: '123',
    };

    mockCreateCheckoutSession.mockResolvedValue(mockCheckoutSession);

    const session = await service.createSubscriptionSession('123', {
      priceId: 'priceId',
    });

    expect(mockCreateCheckoutSession).toHaveBeenNthCalledWith(1, {
      cancel_url: 'undefined',
      success_url: 'undefined?session_id={CHECKOUT_SESSION_ID}',
      mode: 'subscription',
      line_items: [
        {
          price: 'priceId',
          quantity: 1,
        },
      ],
      customer: '123',
    });

    expect(session).toEqual(mockCheckoutSession);
  });

  it('should create a billing portal session', async () => {
    const mockBillingPortalSession = {
      id: 'id',
    };

    mockCreateBillingPortalSession.mockResolvedValue(mockBillingPortalSession);

    const session = await service.getPortal('123');

    expect(mockCreateBillingPortalSession).toHaveBeenNthCalledWith(1, {
      customer: '123',
    });

    expect(session).toEqual(mockBillingPortalSession);
  });
});
