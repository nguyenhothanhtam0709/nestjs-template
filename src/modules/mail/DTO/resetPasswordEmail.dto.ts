export interface ResetPasswordEmailDto {
  name: string;
  code: string;
  expire_time: number;
}
