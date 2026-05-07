import { defineMiddlewares } from '@medusajs/medusa';
import { authenticate } from '@medusajs/framework/http';

export default defineMiddlewares({
  routes: [
    // Protect all /admin/* routes — requires admin JWT
    {
      matcher: '/admin/*',
      middlewares: [authenticate('admin', ['session', 'bearer'])],
    },
    // Protect authenticated customer routes
    {
      matcher: '/store/customer/*',
      middlewares: [authenticate('customer', ['session', 'bearer'])],
    },
  ],
});
