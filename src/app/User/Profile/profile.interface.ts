export interface IPersonalDetails {
  UserName: string
  UserDetails: IUserDetails[]
  Email: string
  PhoneNumber: string
  Designation: string
  Department: string
  UserId: string
}

export interface IUserDetails {
  FirstName: string
  MiddleName: string
  LastName: string
  UserTypeId: string
}
