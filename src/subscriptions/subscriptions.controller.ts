import { Body, Controller, Post, Request } from "@nestjs/common";
import { SubscriptionsService } from "./subscriptions.service";
import { CreateSubscriptionSessionDto } from "./dto/createSubscriptionSession.dto";
import Stripe from "stripe";
import { UserRequest } from "src/utils/types/request";

@Controller("subscriptions")
export class SubscriptionsController {
  constructor(private readonly subscriptionsService: SubscriptionsService) {}

  @Post()
  createSubscriptionSession(
    @Request() req: UserRequest,
    @Body() createSubscriptionSessionDto: CreateSubscriptionSessionDto
  ): Promise<Stripe.Response<Stripe.Checkout.Session> | undefined> {
    return this.subscriptionsService.createSubscriptionSession(
      createSubscriptionSessionDto,
      req.user.account?.stripeCustomerId
    );
  }

  @Post("portal-session")
  updatePlan(
    @Request() req: UserRequest
  ): Promise<Stripe.Response<Stripe.BillingPortal.Session>> {
    return this.subscriptionsService.getPortal(
      req.user.account?.stripeCustomerId
    );
  }
}
