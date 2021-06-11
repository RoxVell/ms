export interface CreateUserDto {
  readonly email: string;
  readonly password: string;
  // readonly roleId: number;
  readonly role: string;
}
