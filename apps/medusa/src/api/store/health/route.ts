import type { MedusaRequest, MedusaResponse } from '@medusajs/medusa';

export const GET = async (_req: MedusaRequest, res: MedusaResponse) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'medusa-commerce' });
};
