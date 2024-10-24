import { User, } from '@shared/domain/models/user.model';
import { Profile, } from '@shared/domain/models/profile.model';
import { Address, } from '@shared/domain/models/address.model';
import { Builder, } from '@shared/domain/interfaces/builder';

import { NewUserDTO, } from '../dtos/new-user.dto';

export class UserBuilder implements Builder<User> {
  private readonly user: User;

  constructor(data?: NewUserDTO) {
    this.user = {
      email: data?.email,
      password: data?.password,
      username: data?.username,
      phoneNumber: data?.phoneNumber,
      givenName: data?.givenName,
      familyName: data?.familyName,
      picture: data?.picture,
      gender: data?.gender,
      birthdate: data?.birthdate,
    } as User;
  }

  withProfile(profile: Profile): UserBuilder {
    this.user.profile = {
      ...this.user.profile,
      ...profile,
    };
    return this;
  }

  withAddresses(addresses: Array<Address>): UserBuilder {
    this.user.addresses = [
      ...this.user.addresses!,
      ...addresses,
    ];

    return this;
  }

  build(): User {
    return this.user;
  }
}