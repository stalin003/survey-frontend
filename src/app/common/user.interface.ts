export interface UserInterface {
  email: string,
  fullName: string,
  dob: string,
  homeAddress: string,
  sni: string,
  password: string,
  active: boolean,
  roles: RoleInterface[];
}

export interface RoleInterface {
  roles: string
}
