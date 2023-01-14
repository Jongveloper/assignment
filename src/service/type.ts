export interface ServerError {
  errors: { status: string, field: string, message: string }[];
}
