import { z } from "zod";

// As per section 9.5 of the handbook

export const UserSchema = z.object({
  id: z.string(),
  name: z.string().optional(),
});

export const ErrorResponseSchema = z.object({
  code: z.number(),
  message: z.string(),
});
// Component Prop Schemas for docs/devtools validation
export const ComponentPropSchemas: Record<string, z.ZodTypeAny> = {
  
  Card: z.object({ title: z.string().optional() }).strict(),
  
  ChartWidget: z.object({ labels: z.array(z.string()), data: z.array(z.number()), title: z.string().optional() }).strict(),
  ThemeSwitcher: z.object({}).strict(),
  ConfirmDialog: z.object({
    title: z.string().optional(),
    message: z.string().optional(),
    confirmLabel: z.string().optional(),
    cancelLabel: z.string().optional()
  }).strict(),
  List: z.object({ items: z.array(z.string()) }).strict(),
  FormGroup: z.object({
    name: z.string(),
    label: z.string(),
    type: z.string().optional(),
    value: z.any().optional(),
    placeholder: z.string().optional(),
    required: z.boolean().optional()
  }).strict(),
  FormGroupValidated: z.object({
    name: z.string(),
    label: z.string(),
    minLength: z.number().optional(),
    maxLength: z.number().optional(),
    pattern: z.string().optional(),
    placeholder: z.string().optional()
  }).strict()
};

export function getComponentPropSchema(name: string){
  return ComponentPropSchemas[name];
}