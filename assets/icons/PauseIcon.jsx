import { createElement } from 'react';

export function PauseIcon(props) {
  return /*#__PURE__*/ createElement(
    'svg',
    Object.assign(
      {
        xmlns: 'http://www.w3.org/2000/svg',
        viewBox: '0 0 500 250',
        fill: 'currentColor',
        'aria-hidden': 'true'
      },
      props
    ),
    /*#__PURE__*/ createElement('path', {
      d: 'M 52.134 45.665 L 52.134 231.678 C 52.134 256.901 68.845 277.338 89.461 277.338 C 110.079 277.338 126.8 256.9 126.8 231.678 L 126.8 45.665 C 126.8 20.454 110.079 0.008 89.461 0.008 C 68.845 0 52.134 20.454 52.134 45.665 Z'
    }),
    createElement('path', {
      d: 'M225.78,0c-20.614,0-37.325,20.446-37.325,45.657V231.67c0,25.223,16.711,45.652,37.325,45.652s37.338-20.43,37.338-45.652 V45.665C263.109,20.454,246.394,0,225.78,0z'
    })
  );
}
