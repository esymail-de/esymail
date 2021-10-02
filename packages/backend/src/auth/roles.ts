import { RolesBuilder } from '@esymail/nest-access-control';

export enum Roles {
  GLOBAL_ADMIN = 'GLOBAL_ADMIN', // root admins can do anything
  GLOBAL_READER = 'GLOBAL_READER', // root readers can read anything
  COMPANY_OWNER = 'COMPANY_OWNER', // the owner is the only person who can delete the server
  COMPANY_ADMIN = 'COMPANY_ADMIN', // company admins can do anything inside their company
  COMPANY_READER = 'COMPANY_READER', // company readers can read anything inside their company
  SERVER_OWNER = 'SERVER_OWNER', // the server owner is the only one who can delete the server
  SERVER_ADMIN = 'SERVER_ADMIN', // server admins can do anything inside their server
  SERVER_READER = 'SERVER_READER', // server readers can read anything inside their server
  SERVER_SENDER = 'SERVER_SENDER', // server senders can only send inside their server (API permissions)
}

/**
 * GLOBAL
 *
 *    - Company:
 *        - Server:
 *            - Message
 *            - Message
 *        - Server:
 *            - Message
 *            - Message
 *        - Server:
 *            - Message
 *
 *    - Company:
 *        - Server:
 *            - Message
 *            - Message
 *            - Message
 *        - Server:
 *            - Message
 *            - Message
 *
 * Each message belongs to a server, which in turn belongs to a company.
 */

export const roles: RolesBuilder = new RolesBuilder();

/**
 * server sender. Can only send messages on one server, so explicit permission for creating messages on one server
 */
roles.grant(Roles.SERVER_SENDER).createOwn('message');

/**
 * server reader. Can read everything on that server
 */
roles
  .grant(Roles.SERVER_READER)
  .readOwn('server')
  .readOwn('messages')
  .readOwn('user')
  .readOwn('scope');

/**
 * server admin. can update anything on the server, can also delete the server.
 * Since this inherits from the SERVER_READER, we dont need to set the readOwn('server') here.
 */
roles.grant(Roles.SERVER_ADMIN).extend(Roles.SERVER_READER).updateOwn('server');

/**
 * server owners can update anything like the server admin but in addition can also
 * delete the server, since he owns it
 */
roles.grant(Roles.SERVER_OWNER).extend(Roles.SERVER_ADMIN).deleteOwn('server');

/**
 * A company reader can read anything in the company, including servers, but cannot change anything.
 */
roles
  .grant(Roles.COMPANY_READER)
  .extend(Roles.SERVER_READER)
  .readOwn('company');

/**
 * A company admin can update anything and read anything within his company,
 * but cannot delete the company.
 *
 * He can also delete servers, even if he's not the admin
 */
roles
  .grant(Roles.COMPANY_ADMIN)
  .extend(Roles.COMPANY_READER)
  .extend(Roles.SERVER_OWNER)
  .updateOwn('company');

/**
 * the company owner is the only one who can delete the company.
 * He can also do anything the admin can.
 */
roles
  .grant(Roles.COMPANY_OWNER)
  .extend(Roles.COMPANY_ADMIN)
  .deleteOwn('company');
