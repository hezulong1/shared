import { isObject } from './base';

/**
 * fork from {@link https://github.com/sindresorhus/escape-string-regexp}
 */
export function escapeStringRegexp(string = '') {
  return string.replace(/[$()*+.?[\\\]^{|}]/g, '\\$&').replace(/-/g, '\\x2d');
}

export function escapeHtml(html: string) {
  return html
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

export function camelize(str: string) {
  return str.replace(/-(\w)/g, (_, letter) => (letter ? letter.toUpperCase() : ''));
}

export function capitalize<T extends string>(str: T) {
  return <Capitalize<T>>(str.charAt(0).toUpperCase() + str.slice(1));
}

export function kebabCase(str: string) {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase();
}

export function stringToLines(str: string) {
  return str.split(/\r\n|\r|\n/);
}

/**
 * @param trim 是否移除空白符，默认 false
 */
export function stringToArray(str: string | string[], delimiter: string | RegExp = ',', trim = false) {
  let res = Array.isArray(str) ? str : str.split(delimiter);
  if (trim === true) {
    res = res.map(s => s.trim()).filter(s => s);
  }
  return res;
}

export function slash(str: string) {
  return str.replace(/\\/g, '/');
}

export function truncate(value: string, maxLength: number, suffix = '…') {
  return value.length <= maxLength ? value : `${value.slice(0, Math.max(0, maxLength))}${suffix}`;
}

export function ensurePrefix(prefix: string, str: string) {
  return str.startsWith(prefix) ? str : (prefix + str);
}

export function ensureSuffix(suffix: string, str: string) {
  return str.endsWith(suffix) ? str : (str + suffix);
}

/**
   * Helper to create a string from a template and a string record.
   * But with objects instead of positional arguments.
   *
   * @param template string to which formatting is applied
   * @param object
   * @example
   * ```ts
   * format('Hello {greet}, Its {status}!', { greet: 'World', status: 'Okay' }) // Hello World, Its Okay!
   * ```
   */
export function format(template: string, object: Record<string | number, any>): string;
/**
   * Helper to produce a string with a variable number of arguments. Insert variable segments
   * into the string using the {n} notation where N is the index of the argument following the string.
   * @param template string to which formatting is applied
   * @param args replacements for {n}-entries
   * @example
   * ```ts
   * format('Hello {0}, Its {1}!', 'World', 'Okay') // Hello World, Its Okay!
   * ```
   */
export function format(template: string, ...args: any[]): string;
export function format(template: string, ...args: any[]): string {
  const [first] = args;

  if (isObject(first)) {
    const values = first as Record<string | number, any>;
    return template.replace(
      /{([^}]+)}/g,
      (match, group) => (values[group] ?? match) as string,
    );
  } else {
    if (args.length === 0) {
      return template;
    }
    return template.replace(
      /{(\d+)}/g,
      (match, group) => {
        const idx = Number.parseInt(group);
        return Number.isNaN(idx) || idx < 0 || (idx >= args.length ? match : args[idx]);
      });
  }
}

export function joinPaths(start: string, end: string) {
  start = start.endsWith('/') ? start.slice(0, -1) : start;
  end = end.startsWith('/') ? end : `/${end}`;
  return start + end;
}

export const EXTERNAL_URL_RE = /^(?:[a-z]+:|\/\/)/i;

export function isExternalUrl(path: string): boolean {
  return EXTERNAL_URL_RE.test(path);
}
