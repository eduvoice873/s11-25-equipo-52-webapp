import { z } from 'zod';
import { PersonCreateSchema, PersonUpdateSchema } from '@/models/person/dto/person';
import { TestimonialCreateSchema, TestimonialUpdateSchema } from '../../testimonial/dto/testimonial';

export const TestimonialFullCreateSchema = z.object({
    person: PersonCreateSchema,
    testimonial: TestimonialCreateSchema,
});

export const TestimonialFullUpdateSchema = z.object({
    person: PersonUpdateSchema,
    testimonial: TestimonialUpdateSchema,
});

export type TestimonialFullCreateDto = z.infer<typeof TestimonialFullCreateSchema>;
export type TestimonialFullUpdateDto = z.infer<typeof TestimonialFullUpdateSchema>;