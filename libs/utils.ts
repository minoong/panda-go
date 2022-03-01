import * as _ from 'lodash';

export function cls(...classnames: string[]) {
 return _.join(classnames, ' ');
}
