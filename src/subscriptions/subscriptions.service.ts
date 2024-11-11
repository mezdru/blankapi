import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import { Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import Stripe from 'stripe';
import { CreateSubscriptionSessionDto } from './dto/createSubscriptionSession.dto';

@Injectable()
export class SubscriptionsService {
  constructor(@InjectStripeClient() private readonly stripeClient: Stripe) {}

  async createSubscriptionSession(
    customerId: string,
    createSubSessionDto: CreateSubscriptionSessionDto,
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    try {
      const session = await this.stripeClient.checkout.sessions.create({
        mode: 'subscription',
        line_items: [
          {
            price: createSubSessionDto.priceId,
            quantity: 1,
          },
        ],
        customer: customerId,
        success_url: `${process.env.CLIENT_URL}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${process.env.CLIENT_URL}`,
      });

      return session;
    } catch (error) {
      console.error(error);
    }
  }

  async getPortal(
    customerId: string,
  ): Promise<Stripe.Response<Stripe.BillingPortal.Session>> {
    return this.stripeClient.billingPortal.sessions.create({
      customer: customerId,
    });
  }
}
