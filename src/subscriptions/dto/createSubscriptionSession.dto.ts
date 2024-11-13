import { ApiProperty } from "@nestjs/swagger";

export class CreateSubscriptionSessionDto {
  @ApiProperty()
  priceId: string;
}
