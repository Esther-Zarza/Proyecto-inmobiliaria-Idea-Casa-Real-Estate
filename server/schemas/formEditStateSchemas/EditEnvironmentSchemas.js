import { z } from 'zod';

export const EditEnvironmentSchemas = z.object({
  property_exterior: z.number().min(1).max(4).nullable(),

  property_interior: z.number().min(1).max(4).nullable(),

  interior_status: z.number().min(1).max(6).nullable(),

  occupation_status: z.number().min(1).max(6).nullable(),

  surroundings: z.number().min(1).max(6).nullable(),

  type_neighbours_zone: z.number().min(1).max(3).nullable(),

  type_neighbours_building: z.number().min(1).max(3).nullable(),

   electricity_meter: z.number().nullable(),

  water_meter: z.number().nullable(),

  gas_meter: z.number().nullable(),
});
