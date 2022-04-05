import join from 'lodash/join';

export function cls(...classnames: string[]) {
 return join(classnames, ' ');
}
