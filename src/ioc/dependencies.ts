import { Injectable, } from './core';

import { FileImplService, } from '@shared/infrastructure/services/file-impl.service';
import { EmailImplService, } from '@shared/infrastructure/services/email-impl.service';
import { ConfigImplService, } from '@shared/infrastructure/services/config-impl.service';
import { FetchHttpRepository, } from '@shared/infrastructure/repositories/fetch-http.repository';
import { DatabaseConnectionProvider, } from '@shared/infrastructure/providers/database-connection.provider';

import { UserRepositoryImplementation } from '@user/infrastructure/repositories/user.repository';

export default [
  {
    token: 'providers:database',
    provider: DatabaseConnectionProvider,
    type: 'Constructor',
    scope: 'Singleton',
  },
  {
    token: 'services:file',
    provider: FileImplService,
    type: 'Constructor',
    scope: 'Singleton',
  },
  {
    token: 'services:email',
    provider: EmailImplService,
    type: 'Constructor',
    scope: 'Singleton',
  },
  {
    token: 'services:config',
    provider: ConfigImplService,
    type: 'Constructor',
    scope: 'Singleton',
  },
  {
    token: 'repositories:http',
    provider: FetchHttpRepository,
    type: 'Constructor',
    scope: 'Singleton',
  },
  {
    token: 'repositories:user',
    provider: UserRepositoryImplementation,
    type: 'Constructor',
    scope: 'Singleton',
  },
] as Array<Injectable>;