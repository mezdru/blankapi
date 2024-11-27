import {
  Body,
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from "@nestjs/common";
import { AccountsService } from "./accounts.service";
import { JwtAuthGuard } from "src/auth/guards/jwt-auth.guard";
import { CreateAccountDto } from "./dto/createAccount.dto";
import { FileInterceptor } from "@nestjs/platform-express";
import { PicturesService } from "src/pictures/pictures.service";
import { UserRequest } from "src/utils/types/request";

@Controller("accounts")
export class AccountsController {
  constructor(
    private readonly accountsService: AccountsService,
    private readonly picturesService: PicturesService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor("picture"))
  @UseGuards(JwtAuthGuard)
  async createAccount(
    @Request() req: UserRequest,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 2 * 1024 * 1024 /* 2MB */ }),
          new FileTypeValidator({
            fileType: /^(image\/jpeg|image\/png|image\/gif)$/,
          }),
        ],
      })
    )
    picture: Express.Multer.File,
    @Body() createAccount: CreateAccountDto
  ) {
    return this.accountsService.createOne(createAccount, req.user, picture);
  }
}
