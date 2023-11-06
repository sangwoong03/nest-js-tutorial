import { PingModule } from "./ping/ping.module";
import { AuthModule } from "./auth/auth.module";

// import { User } from "./auth/entity/user.entity";

// export const entities = [
//   User
// ]

export const modules = [
  PingModule,
  AuthModule
];