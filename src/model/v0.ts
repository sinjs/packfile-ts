import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUrl, ValidateNested } from "class-validator";
import { IMetadata, IMod, IPackfile, IVersion, ModLoader } from "../interface/v0";
import { Type } from "class-transformer";

export class Version implements IVersion {
  @IsNumber()
  major: number;

  @IsNumber()
  minor: number;

  @IsNumber()
  patch: number;

  @IsNotEmpty()
  name: string;
}

export class Metadata implements IMetadata {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @Type(() => Version)
  @ValidateNested()
  version: Version;
}

export class Mod implements IMod {
  @IsUrl()
  download: string;

  @Type(() => Metadata)
  @ValidateNested()
  meta: Metadata;
}

export class Packfile implements IPackfile {
  @IsString()
  public readonly _pf_version: string = "v0";

  @Type(() => Metadata)
  @ValidateNested()
  meta: Metadata;

  @Type(() => Mod)
  @ValidateNested()
  mods: Mod[];

  @IsEnum(ModLoader)
  loader: ModLoader;
}
