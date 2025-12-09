import { z } from 'zod';
import { PersonCreateSchema, PersonUpdateSchema } from '@/models/person/dto/person';
import { MedioCreateSchema, MedioUpdateSchema } from '@/models/medio/dto/medio';
import { TestimonialCreateSchema, TestimonialUpdateSchema } from '../../testimonial/dto/testimonial';

export const TestimonialFullCreateSchema = z.object({
    person: PersonCreateSchema,
    testimonial: TestimonialCreateSchema,
    medio: MedioCreateSchema.optional().nullable(),
});

export const TestimonialFullUpdateSchema = z.object({
    person: PersonUpdateSchema,
    testimonial: TestimonialUpdateSchema,
    medio: MedioUpdateSchema,
});

export type TestimonialFullCreateDto = z.infer<typeof TestimonialFullCreateSchema>;
export type TestimonialFullUpdateDto = z.infer<typeof TestimonialFullUpdateSchema>;