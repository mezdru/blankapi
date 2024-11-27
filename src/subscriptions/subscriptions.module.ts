import { Module } from "@nestjs/common";
import { SubscriptionsService } from "./subscriptions.service";
import { SubscriptionsController } from "./subscriptions.controller";
import { StripeModule } from "@golevelup/nestjs-stripe";

@Module({
  imports: [
    StripeModule.forRoot(StripeModule, {
      apiKey: process.env.STRIPE_SECRET_KEY,
      webhookConfig: {
        stripeSecrets: {
          account: process.env.STRIPE_ACCOUNT_KEY,
          accountTest: process.env.STRIPE_ACCOUNT_TEST_KEY,
        },
        requestBodyProperty: "rawBody",
      },
    }),
  ],
  controllers: [SubscriptionsController],
  providers: [SubscriptionsService],
  exports: [SubscriptionsService],
})
export class SubscriptionsModule {}
