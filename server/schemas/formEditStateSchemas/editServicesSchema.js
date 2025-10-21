import {z} from 'zod';

export const editServicesSchema = z.object({
  communications: z.number().min(1).max(10).nullable(),
  supermarkets: z.number().min(1).max(10).nullable(),
  street_status: z.number().min(1).max(10).nullable(),
  mobile_coverage: z.number().min(1).max(10).nullable(),
  parking: z.number().min(1).max(10).nullable(),
  views: z.number().min(1).max(10).nullable(),
  health_places: z.number().min(1).max(10).nullable(),
  shops: z.number().min(1).max(10).nullable(),
  schools: z.number().min(1).max(10).nullable(),
  visitor_zone: z.number().min(1).max(10).nullable(),
  visitor_building: z.number().min(1).max(10).nullable(),
  visitor_property: z.number().min(1).max(10).nullable()
  // property_id: z.number().min(1).max(10).nullable()
});