import { Controller, Post, Body, Headers, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { WebhooksService } from './webhooks.service';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('webhooks')
@Controller({ path: 'webhooks', version: '1' })
@Public()
export class WebhooksController {
  constructor(private readonly webhooksService: WebhooksService) {}

  @Post('medusa')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Medusa.js webhook endpoint' })
  handleMedusa(@Body() body: { event: string; data: unknown }) {
    return this.webhooksService.handleMedusaWebhook(body.event, body.data);
  }

  @Post('sanity')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Sanity.io webhook endpoint' })
  handleSanity(
    @Body() body: unknown,
    @Headers('sanity-webhook-signature') signature: string,
  ) {
    return this.webhooksService.handleSanityWebhook(body, signature);
  }
}
