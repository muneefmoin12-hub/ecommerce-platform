import { Controller, Post, Body, RawBodyRequest, Req, Headers, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { Request } from 'express';
import { PaymentsService } from './payments.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('payments')
@Controller({ path: 'payments', version: '1' })
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post('create-intent')
  @UseGuards(JwtAuthGuard)
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Create Stripe payment intent' })
  createIntent(@Body() body: { orderId: string; amount: number; currency?: string }) {
    return this.paymentsService.createPaymentIntent(body.orderId, body.amount, body.currency);
  }

  @Post('webhook')
  @Public()
  @ApiOperation({ summary: 'Stripe webhook handler' })
  async handleWebhook(
    @Req() req: RawBodyRequest<Request>,
    @Headers('stripe-signature') signature: string,
  ) {
    if (!req.rawBody) throw new Error('No raw body');
    await this.paymentsService.handleWebhook(req.rawBody, signature);
    return { received: true };
  }
}
