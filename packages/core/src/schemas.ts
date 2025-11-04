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
  Modal: z.object({ size: z.enum(['sm','md','lg']).optional() }).strict(),
  Card: z.object({ title: z.string().optional() }).strict(),
  Table: z.object({
    columns: z.array(z.object({ key: z.string(), label: z.string() })),
    data: z.array(z.record(z.string(), z.any()))
  }).strict(),
  ChartWidget: z.object({
    labels: z.array(z.string()),
    data: z.array(z.number()),
    title: z.string().optional()
  }).strict(),
  ThemeSwitcher: z.object({}).strict(),
  ConfirmDialog: z.object({
    title: z.string().optional(),
    message: z.string().optional(),
    confirmLabel: z.string().optional(),
    cancelLabel: z.string().optional()
  }).strict(),
  Notice: z.object({ type: z.enum(['info','success','warning','danger']).optional(), message: z.string().optional() }).strict(),
  List: z.object({ items: z.array(z.string()) }).strict(),
  Sidebar: z.object({}).strict(),
  Loader: z.object({ type: z.enum(['spinner']).optional() }).strict(),
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
