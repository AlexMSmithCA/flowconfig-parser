// @flow
/*eslint-env node*/

const {promisify} = require('util');

const {readFile: r} = require('fs');

const read = promisify(r);

type SectionNamesType =
  | 'declarations'
  | 'include'
  | 'ignore'
  | 'untyped'
  | 'libs'
  | 'lints'
  | 'options'
  | 'version'
  | 'comment';

type DeclarationsType = Array<string>;
type IncludeType = Array<string>;
type IgnoreType = Array<string>;
type UntypedType = Array<string>;
type LibsType = Array<string>;
type LintsType = {};
type OptionsType = {};
type VersionType = string;

export type ConfigType = {|
  declarations?: ?DeclarationsType,
  include?: ?IncludeType,
  ignore?: ?IgnoreType,
  untyped?: ?UntypedType,
  libs?: ?LibsType,
  lints?: ?LintsType,
  options?: ?OptionsType,
  version?: ?VersionType,
|};

export function encode(config: ConfigType): string {
  const sections = Object.keys(config);

  let data = '';
  for (const section of sections) {
    data += `${section}\n`;
    switch (section) {
      case 'declarations':
      case 'include':
      case 'ignore':
      case 'untyped':
      case 'libs':
        data += `${config[section].join('\n')}`;
        break;
      case 'lints':
      case 'options':
        const obj = config[section];
        data += `${obj
          .keys()
          .map(k => k + '=' + obj[k])
          .join('\n')}`;
        break;
      default:
        throw new Error(`Unknown .flowconfig section (${section}) found.`);
    }
    data += '\n';
  }
  return data;
}

export function decode(s: string): ConfigType {
  throw new Error('Not implemented');
}

export function isValid(config: ConfigType): boolean {
  throw new Error('Not implemented');
}
