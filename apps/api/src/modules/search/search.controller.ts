import { Controller, Get, Post, Query, UseGuards, HttpCode } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBearerAuth } from '@nestjs/swagger';
import { SearchService } from './search.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Public } from '../../common/decorators/public.decorator';

@ApiTags('search')
@Controller('search')
export class SearchController {
  constructor(private readonly searchService: SearchService) {}

  @Public()
  @Get()
  @ApiOperation({ summary: 'Full-text product search via Meilisearch' })
  async search(
    @Query('q') query = '',
    @Query('page') page = '1',
    @Query('limit') limit = '24',
    @Query('filter') filter?: string,
  ) {
    return this.searchService.search(query, {
      page: Number(page),
      limit: Number(limit),
      filter,
    });
  }

  @Post('reindex')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('admin', 'super_admin')
  @ApiBearerAuth()
  @HttpCode(200)
  @ApiOperation({ summary: 'Re-index all products in Meilisearch (admin only)' })
  async reindex() {
    const count = await this.searchService.reindexAll();
    return { indexed: count, timestamp: new Date().toISOString() };
  }
}
