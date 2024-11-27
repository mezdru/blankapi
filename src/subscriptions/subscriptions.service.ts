import { InjectStripeClient } from "@golevelup/nestjs-stripe";
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from "@nestjs/common";
import Stripe from "stripe";
import { CreateSubscriptionSessionDto } from "./dto/createSubscriptionSession.dto";
import { Account } from "src/accounts/entities/account.entity";
import { User } from "src/users/entities/user.entity";

@Injectable()
export class SubscriptionsService {
  constructor(@InjectStripeClient() private readonly stripeClient: Stripe) {}

  async createSubscriptionSession(
    createSubSessionDto: CreateSubscriptionSessionDto,
    customerId?: string
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    try {
      const session = await this.stripeClient.checkout.sessions.create({
        mode: "subscription",
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
      throw new InternalServerErrorException(
        "Failed to create subscription session"
      );
    }
  }

  async getPortal(
    customerId?: string
  ): Promise<Stripe.Response<Stripe.BillingPortal.Session>> {
    if (!customerId)
      throw new BadRequestException("Acccount customer ID is required");

    return this.stripeClient.billingPortal.sessions.create({
      customer: customerId,
    });
  }

  async createCustomer(account: Account, user: User): Promise<string> {
    const customer = await this.stripeClient.customers.create({
      name: user.firstName + " " + user.lastName,
      metadata: {
        accountId: account.id,
        userId: user.id,
      },
    });

    return customer.id;
  }
}
