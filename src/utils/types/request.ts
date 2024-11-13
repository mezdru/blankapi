import { Request } from "express";
import { User } from "src/users/entities/user.entity";

export type UserRequest = Request & { user: User };
