export enum ModLoader {
  Fabric,
  Forge,
  Quilt,
}

export interface IMetadata {
  name: string;
  description: string;
  author: string;
  version: IVersion;

  website?: string;
  icon?: string;
}

export interface IMod {
  download: string;
  meta: IMetadata;
}

export interface IVersion {
  major: number;
  minor: number;
  patch: number;
  name: string;
}

export interface IPackfile {
  $schema?: any;
  _pf_version: string;

  meta: IMetadata;
  loader: ModLoader;
  mods: IMod[];
}
