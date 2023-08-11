import { Request } from "express";
import { UserEntity } from "modules/user/user.entity";

export interface CommonRequestUser extends Request{
    user:UserEntity
}