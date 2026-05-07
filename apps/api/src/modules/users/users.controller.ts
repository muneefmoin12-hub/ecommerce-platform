import { Controller, Get, Patch, Body, Param, UseGuards, ParseUUIDPipe, Query } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { CurrentUser } from '../../common/decorators/current-user.decorator';

@ApiTags('users')
@Controller({ path: 'users', version: '1' })
@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'List all users (admin only)' })
  findAll(@Query('page') page = 1, @Query('limit') limit = 20) {
    return this.usersService.findAll(Number(page), Number(limit));
  }

  @Get('me')
  @ApiOperation({ summary: 'Get current user profile' })
  getProfile(@CurrentUser() user: { id: string }) {
    return this.usersService.findOne(user.id);
  }

  @Patch('me')
  @ApiOperation({ summary: 'Update current user profile' })
  updateProfile(
    @CurrentUser() user: { id: string },
    @Body() body: { firstName?: string; lastName?: string; phone?: string },
  ) {
    return this.usersService.update(user.id, body);
  }

  @Get(':id')
  @UseGuards(RolesGuard)
  @Roles('admin', 'super_admin')
  @ApiOperation({ summary: 'Get user by ID (admin only)' })
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.usersService.findOne(id);
  }
}
