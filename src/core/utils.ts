import {camelCase, kebabCase} from 'lodash'

export function toCamelCase(str: string): string {
    return camelCase(str);
}

export function toKebabCase(str: string): string {
    return kebabCase(str);
}