/**
*
* Icons definition file used by Icon component (/components/Icon)
*
* for each icon one or more SVG-paths are required and optionally also the viewport size (defaults to 24px)
* iconName: {
*   size: 24,
*   paths: ['s v g', 'p a t h s'],
* }
*
* when omitting the size, the paths can also be given:
* iconName: {
*   paths: ['s v g', 'p a t h s'],
* }
* can be given as
* iconName: ['s v g', 'p a t h s'],
*
*
*
*/

const icons = {
  placeholder: {
    size: 24,
    paths: [
      'M4,4V20H20V4ZM18.29,5,12,11.29,5.71,5ZM5,5.71,11.29,12,5,18.29ZM5.71,19,12,12.71,18.29,19ZM19,18.29,12.71,12,19,5.71Z',
    ],
  },
  // Taxonomies
  // 1: Human Rights Body
  taxonomy_1: {
    size: 40,
    paths: [
      'M32,19H25.33l.29-3.8A1.43,1.43,0,0,1,27.08,14h3.16a1.43,1.43,0,0,1,1.47,1.2Zm-3.34-6a2,2,0,1,0-2-2A2,2,0,0,0,28.66,13Zm-7.08,1H18.42A1.43,1.43,0,0,0,17,15.2L16.66,19h6.67L23,15.2A1.43,1.43,0,0,0,21.58,14Z',
      'M20,13a2,2,0,1,0-2-2A2,2,0,0,0,20,13Zm-7.08,1H9.75a1.43,1.43,0,0,0-1.47,1.2L8,19h6.67l-.29-3.8A1.43,1.43,0,0,0,12.92,14Zm-1.58-1a2,2,0,1,0-2-2A2,2,0,0,0,11.34,13Z',
      'M4,20v2H5v7s2,3,15,3,15-3,15-3V22h1V20Z',
    ],
  },
  // 2: UN session
  taxonomy_2: {
    size: 40,
    paths: [
      'M32.5,20A12.51,12.51,0,0,1,22,32.32V36l-8-5,8-5v3.28A9.49,9.49,0,0,0,25,12l2-1.26.73-.46A12.48,12.48,0,0,1,32.5,20Zm-22,0A9.51,9.51,0,0,1,18,10.72V14l8-5L18,4V7.68a12.48,12.48,0,0,0-5.79,22.08l.73-.46L15,28A9.49,9.49,0,0,1,10.5,20Z',
    ],
  },
  // 3: Human rights issue
  taxonomy_3: {
    size: 40,
    paths: [
      'M17,11h4V21H17Zm2,12a2,2,0,1,0,2,2A2,2,0,0,0,19,23Zm12.62,5.38-.71.71-2.15-2.15-3,2.69,1.94,1.94,1.41-1.41.71.71L27.73,33l5.15,5.15,4.24-4.24Z',
      'M33,19A14,14,0,1,0,19,33,14,14,0,0,0,33,19Zm-3,0A11,11,0,1,1,19,8,11,11,0,0,1,30,19Z',
    ],
  },
  // 4: Affected persons
  taxonomy_4: {
    size: 40,
    paths: [
      'M15,10a2.5,2.5,0,1,0-2.5-2.5A2.5,2.5,0,0,0,15,10Zm10,0a2.5,2.5,0,1,0-2.5-2.5A2.5,2.5,0,0,0,25,10Z',
      'M24,24.9A1,1,0,0,1,23,26h-.8l-.56,7.93A1.15,1.15,0,0,1,20.47,35h-.95a1.15,1.15,0,0,1-1.15-1.07L17.82,26H17a1,1,0,0,1-1-1.1l.51-7.4A1.68,1.68,0,0,1,18.19,16h3.61a1.68,1.68,0,0,1,1.68,1.5Z',
      'M20,15a2.5,2.5,0,1,0-2.5-2.5A2.5,2.5,0,0,0,20,15Zm-6,9.9A1,1,0,0,1,13,26h-.8l-.56,7.93A1.15,1.15,0,0,1,10.47,35H9.53a1.15,1.15,0,0,1-1.15-1.07L7.82,26H7a1,1,0,0,1-1-1.1l.51-7.4A1.68,1.68,0,0,1,8.19,16h3.61a1.68,1.68,0,0,1,1.68,1.5Z',
      'M10,15a2.5,2.5,0,1,0-2.5-2.5A2.5,2.5,0,0,0,10,15Zm24,9.9A1,1,0,0,1,33,26h-.8l-.56,7.93A1.15,1.15,0,0,1,30.47,35h-.95a1.15,1.15,0,0,1-1.15-1.07L27.82,26H27a1,1,0,0,1-1-1.1l.51-7.4A1.68,1.68,0,0,1,28.19,16h3.61a1.68,1.68,0,0,1,1.68,1.5Z',
      'M30,15a2.5,2.5,0,1,0-2.5-2.5A2.5,2.5,0,0,0,30,15Z',
    ],
  },
  // 5: Thematic cluster
  taxonomy_5: {
    size: 40,
    paths: [
      'M36,20a3,3,0,0,1-5.82,1H24.9a5,5,0,0,1-1.59,2.73L26,28.32a3,3,0,1,1-1.73,1l-2.66-4.6a4.54,4.54,0,0,1-3.14,0l-2.66,4.6a3,3,0,1,1-1.73-1l2.65-4.59A5,5,0,0,1,15.1,21H9.82a3,3,0,1,1,0-2H15.1a5,5,0,0,1,1.59-2.73L14,11.68a3,3,0,1,1,1.73-1l2.66,4.6a4.54,4.54,0,0,1,3.14,0l2.66-4.6a3,3,0,1,1,1.73,1l-2.65,4.59A5,5,0,0,1,24.9,19h5.28A3,3,0,0,1,36,20Z',
    ],
  },
  // 6: Organisation
  taxonomy_6: {
    size: 40,
    paths: [
      'M26.5,19h5L34,15l-2.5-4h-5L24,15Zm-18,0h5L16,15l-2.5-4h-5L6,15Zm18,10h5L34,25l-2.5-4h-5L24,25Zm-18,0h5L16,25l-2.5-4h-5L6,25Zm9,5h5L25,30l-2.5-4h-5L15,30Zm0-20h5L25,10,22.5,6h-5L15,10Z',
    ],
  },
  // 7: SDGs
  taxonomy_7: {
    size: 40,
    paths: [
      'M31,7.15l-4.58,5a9.86,9.86,0,0,0-1.64-1L27.29,4.8A16.61,16.61,0,0,1,31,7.15Zm-9.7-3.76v6.82a9.77,9.77,0,0,1,1.89.35L25.7,4.2A16.53,16.53,0,0,0,21.35,3.39Z',
      'M35,11.82A16.68,16.68,0,0,0,32.3,8.29l-4.59,5a9.8,9.8,0,0,1,1.16,1.54Zm2,5.79a16.52,16.52,0,0,0-1.22-4.26l-6.09,3a9.73,9.73,0,0,1,.52,1.86Z',
      'M19.65,10.21V3.39a16.54,16.54,0,0,0-4.35.81l2.46,6.36A9.76,9.76,0,0,1,19.65,10.21Zm10.67,9.71s0,0,0,.06a9.71,9.71,0,0,1-.18,1.86l6.55,1.86A16.58,16.58,0,0,0,37.13,20c0-.23,0-.47,0-.7Z',
      'M13.2,26.56l-5.44,4.1a16.67,16.67,0,0,0,3.27,3l3.59-5.8A9.92,9.92,0,0,1,13.2,26.56Z',
      'M8.7,8.29A16.64,16.64,0,0,0,6,11.82l6.11,3a9.88,9.88,0,0,1,1.16-1.54Zm2,11.64L3.9,19.29c0,.23,0,.46,0,.7a16.58,16.58,0,0,0,.44,3.72l6.55-1.86A9.71,9.71,0,0,1,10.68,20S10.68,19.95,10.68,19.92Zm12.44,9.53,1.25,6.72a16.51,16.51,0,0,0,4.16-1.62l-3.59-5.79A9.8,9.8,0,0,1,23.12,29.45Z',
      'M5.27,13.34A16.53,16.53,0,0,0,4.06,17.6l6.79.63a9.72,9.72,0,0,1,.52-1.86Z',
      'M30,33.66a16.65,16.65,0,0,0,3.27-3l-5.44-4.1a9.86,9.86,0,0,1-1.42,1.3Z',
      'M4.76,25.34a16.57,16.57,0,0,0,2,4l5.44-4.1a9.75,9.75,0,0,1-.85-1.73Z',
      'M16.18,11.17,13.71,4.8A16.65,16.65,0,0,0,10,7.15l4.59,5A9.84,9.84,0,0,1,16.18,11.17Zm.42,25,1.26-6.71a9.8,9.8,0,0,1-1.8-.69l-3.59,5.79A16.48,16.48,0,0,0,16.6,36.16Zm2.92-6.4-1.26,6.7a14.7,14.7,0,0,0,4.43,0l-1.25-6.7A8.3,8.3,0,0,1,19.53,29.76Zm14.73-.45a16.52,16.52,0,0,0,2-4l-6.57-1.87a9.77,9.77,0,0,1-.85,1.73Z',
    ],
  },

  // Icons
  measures: {
    size: 24,
    paths: [
      'M6,3H19l-5,8h8L9,24V14H3Z',
    ],
  },
  indicators: {
    size: 24,
    paths: [
      'M5,4H8V21H5Z',
      'M9,21h3V8H9Zm4,0h3V14H13Zm4-10V21h3V11Z',
    ],
  },
  recommendations: {
    size: 24,
    paths: [
      'M18,4H6A4,4,0,0,0,2,8v8a4,4,0,0,0,4,4v3l5-3h7a4,4,0,0,0,4-4V8A4,4,0,0,0,18,4Z',
      'M11,7h2v6H11Zm1,10.14A1.14,1.14,0,1,1,13.14,16,1.14,1.14,0,0,1,12,17.14Z',
    ],
  },
  categories: {
    size: 24,
    paths: [
      'M19,4.08l-6.82.75a1.48,1.48,0,0,0-.88.42L3.43,13.11a1.48,1.48,0,0,0,0,2.09L9.8,21.57a1.48,1.48,0,0,0,2.09,0l7.85-7.85a1.48,1.48,0,0,0,.42-.88L20.92,6A1.75,1.75,0,0,0,19,4.08Z',
      'M17.83,9.29a1.5,1.5,0,1,1,0-2.12A1.5,1.5,0,0,1,17.83,9.29Z',
    ],
  },
  connectedCategories: {
    size: 24,
    paths: [
      'M16.77,6.73a1.5,1.5,0,1,0,1.06.44A1.49,1.49,0,0,0,16.77,6.73Zm2.41-2.66H19l-6.82.75a1.48,1.48,0,0,0-.88.42L3.43,13.11a1.48,1.48,0,0,0,0,2.09L9.8,21.57a1.48,1.48,0,0,0,2.09,0l7.85-7.85a1.48,1.48,0,0,0,.42-.88L20.92,6A1.75,1.75,0,0,0,19.18,4.07Zm0,8.65A.48.48,0,0,1,19,13l-7.85,7.85a.48.48,0,0,1-.68,0L4.14,14.49a.48.48,0,0,1,0-.68L12,6a.48.48,0,0,1,.29-.14l6.82-.75h.09a.75.75,0,0,1,.74.83Z',
    ],
  },
  sdgtargets: {
    size: 24,
    paths: [
      'M10.11,5.9,8.39,1.46l.13,0A11.07,11.07,0,0,1,11.43.88h.13V5.63h-.11a6.36,6.36,0,0,0-1.23.23Zm-4.36,7.3A6.32,6.32,0,0,1,5.63,12v-.16L.9,11.39v.13c0,.16,0,.31,0,.47a11.11,11.11,0,0,0,.29,2.49l0,.13,4.57-1.3Zm.82-4.53a6.4,6.4,0,0,1,.75-1l.08-.08L4.2,4.06l-.09.09A11.17,11.17,0,0,0,2.31,6.52l-.06.11L6.51,8.76Z',
      'M8.13,6.92A6.4,6.4,0,0,1,9.2,6.26l.1-.05L7.58,1.76l-.12.05A11.13,11.13,0,0,0,4.94,3.39l-.1.08L8,7Zm8.55.74a6.47,6.47,0,0,1,.75,1l.06.1,4.26-2.13-.07-.11A11.16,11.16,0,0,0,19.9,4.15l-.09-.09L16.6,7.58Zm1.24,2a6.36,6.36,0,0,1,.34,1.2l0,.11L23,10.52l0-.13a11.09,11.09,0,0,0-.81-2.85l-.05-.12L17.88,9.54Z',
      'M13.78,5.86l.11,0,1.72-4.44-.12,0A11,11,0,0,0,12.57.88h-.13V5.63h.11A6.32,6.32,0,0,1,13.78,5.86Zm.92.35.1.05a6.46,6.46,0,0,1,1.07.66L16,7l3.2-3.51-.1-.08a11.11,11.11,0,0,0-2.52-1.57l-.12-.05L14.74,6.1Zm-9,4.64a6.35,6.35,0,0,1,.34-1.2l0-.11L1.86,7.42l-.05.12A11.07,11.07,0,0,0,1,10.39l0,.13L5.72,11Zm.86,4.52A6.35,6.35,0,0,1,6,14.25l0-.11-4.58,1.3,0,.12a11.11,11.11,0,0,0,1.33,2.66l.07.11,3.79-2.86Zm10.14.88a6.36,6.36,0,0,1-.92.84l-.09.07,2.51,4,.11-.08a11.13,11.13,0,0,0,2.19-2l.08-.1-3.8-2.87Zm1.22-2a6.28,6.28,0,0,1-.55,1.12l-.06.1,3.79,2.86.07-.11a11.1,11.1,0,0,0,1.33-2.65l0-.12L18,14.14Zm5.15-2.73v-.13l-4.74.44V12a6.34,6.34,0,0,1-.12,1.2l0,.11,4.57,1.3,0-.13A11.17,11.17,0,0,0,23.13,12C23.13,11.83,23.12,11.67,23.11,11.52Zm-8.23,6.16a6.39,6.39,0,0,1-1.18.45l-.11,0,.87,4.69.13,0a11.06,11.06,0,0,0,2.78-1.09l.12-.06-2.5-4Zm-2.26.65a5.35,5.35,0,0,1-1.25,0h-.12L10.38,23l.13,0a9.93,9.93,0,0,0,3,0l.13,0-.87-4.68Z',
      'M8.19,17.1a6.48,6.48,0,0,1-.92-.84l-.08-.09L3.39,19l.08.1a11.15,11.15,0,0,0,2.19,2l.11.08,2.51-4Zm2.1,1a6.41,6.41,0,0,1-1.17-.45L9,17.63l-2.5,4,.11.06a11.06,11.06,0,0,0,2.76,1.08l.13,0,.88-4.68Z ',
    ],
  },
  calendar: {
    size: 24,
    paths: [
      'M15,11h4v3H15Zm0,4h4v3H15Zm-5-4h4v3H10Zm0,4h4v3H10ZM5,11H9v3H5Zm0,4H9v3H5Zm4-1H5V11H9Zm5,0H10V11h4Zm5,0H15V11h4ZM9,18H5V15H9Zm5,0H10V15h4Zm5,0H15V15h4ZM20,4H18V6H17V2H15V4H9V6H8V2H6V4H4A2,2,0,0,0,2,6V22H22V6A2,2,0,0,0,20,4Zm0,16H4V9H20Z',
    ],
  },
  reminder: {
    size: 24,
    paths: [
      'M13,6v5h3v2H11V6Zm8.95,5h-2A8,8,0,1,1,12,4a7.89,7.89,0,0,1,4.84,1.66l-.2.2L15,7.5,21.5,9,20,2.5,18.27,4.23A10,10,0,1,0,22,12C22,11.66,22,11.33,21.95,11Z',
    ],
  },
  report: {
    size: 24,
    paths: [
      'M18.71,6.7,15.29,3.29A1,1,0,0,0,14.59,3H6A1,1,0,0,0,5,4V20a1,1,0,0,0,1,1H18a1,1,0,0,0,1-1V7.41A1,1,0,0,0,18.71,6.7ZM17,19H7V5h6V9h4ZM8,11h8v1H8Zm0,2h8v1H8Zm0,2h4v1H8Z',
    ],
  },
  recommendationAccepted: {
    size: 24,
    paths: [
      'M18,4H6A4,4,0,0,0,2,8v8a4,4,0,0,0,4,4v3l5-3h7a4,4,0,0,0,4-4V8A4,4,0,0,0,18,4ZM10,16.41,6.29,12.71l1.41-1.41L10,13.59l6.29-6.29,1.41,1.41Z',
    ],
  },
  recommendationNoted: {
    size: 24,
    paths: [
      'M18,4H6A4,4,0,0,0,2,8v8a4,4,0,0,0,4,4v3l5-3h7a4,4,0,0,0,4-4V8A4,4,0,0,0,18,4ZM16.71,15.29l-1.41,1.41L12,13.41,8.71,16.71,7.29,15.29,10.59,12,7.29,8.71,8.71,7.29,12,10.59l3.29-3.29,1.41,1.41L13.41,12Z',
    ],
  },
  attributes: {
    size: 24,
    paths: [
      'M12,3a9,9,0,1,0,9,9A9,9,0,0,0,12,3Zm5,10H13v4H11V13H7V11h4V7h2v4h4Z',
    ],
  },
  connections: {
    size: 24,
    paths: [
      'M8.5,5.5a3,3,0,0,1,6,0h0a3,3,0,1,1-6,0Zm-4,10a3,3,0,1,0,3,3h0A3,3,0,0,0,4.5,15.5Zm10.1,2H9.4a5,5,0,0,1,0,2h5.2a5,5,0,0,1,0-2Zm4.9-2a3,3,0,1,0,3,3h0A3,3,0,0,0,19.5,15.5Z',
      'M8.31,9.32,5.93,13.73a5,5,0,0,1,1.76.95l2.38-4.42A5,5,0,0,1,8.31,9.32Zm6.6-.18a5,5,0,0,1-1.71,1l2.88,4.68a5,5,0,0,1,1.71-1Z',
    ],
  },
  search: {
    size: 24,
    paths: [
      'M23.06,20.94l-4.73-4.73a9,9,0,1,0-2.12,2.12l4.73,4.73ZM11,17a6,6,0,1,1,6-6A6,6,0,0,1,11,17Z',
    ],
  },
  download: {
    size: 24,
    paths: [
      'M20,16v4H4V16H6v2H18V16ZM9,12l3,4,3-4H13V4H11v8Z',
    ],
  },
  columnExpand: {
    size: 24,
    paths: [
      'M11,11v2H5v2L1,12,5,9v2Zm12,1L19,9v2H13v2h6v2Z',
    ],
  },
  columnCollapse: {
    size: 24,
    path: 'M1,13V11H7V9l4,3L7,15V13Zm12-1,4,3V13h6V11H17V9Z',
  },
  // Icons 16px
  dropdownOpen: {
    size: 16,
    paths: [
      'M8,11.34,2.84,6.75l1.33-1.5L8,8.66l3.84-3.41,1.33,1.5Z',
    ],
  },
  dropdownClose: {
    size: 16,
    paths: [
      'M11.84,10.75,8,7.34,4.16,10.75,2.84,9.25,8,4.66l5.16,4.59Z',
    ],
  },
  removeSmall: {
    size: 16,
    paths: [
      'M12.95,4.46,9.41,8l3.54,3.54-1.41,1.41L8,9.41,4.46,12.95,3.05,11.54,6.59,8,3.05,4.46,4.46,3.05,8,6.59l3.54-3.54Z',
    ],
  },
  add: {
    size: 16,
    paths: [
      'M14,9H9v5H7V9H2V7H7V2H9V7h5Z',
    ],
  },
  info: {
    size: 16,
    paths: [
      'M7,6H9v7H7ZM8,5A1,1,0,1,0,7,4,1,1,0,0,0,8,5Z',
    ],
  },
  // Icons 32px
  trash: {
    size: 32,
    paths: [
      'M26,6V9H7V6ZM19,4H14V5h5ZM8,10H25L24,26.06a1,1,0,0,1-1.06.94H10.06A1,1,0,0,1,9,26.06ZM20.18,24h1l.65-11h-1ZM16,24h1V13H16ZM11.18,13l.65,11h1l-.65-11Z',
    ],
  },
  filter: {
    size: 32,
    paths: [
      'M28,7V9H12.9a5,5,0,0,0,0-2ZM8,5a3,3,0,1,0,3,3A3,3,0,0,0,8,5Zm13,8a3,3,0,1,0,3,3A3,3,0,0,0,21,13Zm5,3a5,5,0,0,1-.1,1H28V15H25.9A5,5,0,0,1,26,16Zm-9.9-1H5v2H16.1a5,5,0,0,1,0-2ZM19,24a5,5,0,0,1-.1,1H28V23H18.9A5,5,0,0,1,19,24ZM9.1,23H5v2H9.1a5,5,0,0,1,0-2ZM14,21a3,3,0,1,0,3,3A3,3,0,0,0,14,21Z',
    ],
  },
  edit: {
    size: 32,
    paths: [
      'M21,20l2-2V28H5V10H16l-2,2H7V26H21ZM22,7.43,25.57,11l-9.9,9.9-3.54-3.54Zm6.36.71-2.12,2.12L22.74,6.72,24.86,4.6ZM15,21.57l-4.6,1.06L11.43,18Z',
    ],
  },
  close: {
    size: 48,
    paths: [
      'M36,14.1,26.12,24,36,33.9,33.9,36,24,26.12,14.1,36,12,33.9l9.9-9.9L12,14.1,14.1,12l9.9,9.9L33.9,12Z',
    ],
  },
  removeLarge: {
    size: 32,
    paths: [
      'M23.78,9.64,17.41,16l6.36,6.36-1.41,1.41L16,17.41,9.64,23.78,8.22,22.36,14.59,16,8.22,9.64,9.64,8.22,16,14.59l6.36-6.36Z',
    ],
  },
  arrowDown: {
    size: 32,
    paths: [
      'M16,23.7,2.15,10.92l1.7-1.84L16,20.3,28.15,9.08l1.7,1.84Z',
    ],
  },
  arrowRight: {
    size: 32,
    paths: [
      'M10.92,29.85l-1.84-1.7L20.3,16,9.08,3.85l1.84-1.7L23.7,16Z',
    ],
  },
  arrowLeft: {
    size: 32,
    paths: [
      'M21.08,29.85,8.3,16,21.08,2.15l1.84,1.7L11.7,16,22.92,28.15Z',
    ],
  },
  sorting: {
    size: 24,
    paths: 'M9,17h2L8,21,5,17H7V5H9ZM16,3,13,7h2V19h2V7h2Z',
  },
  ascending: {
    size: 24,
    paths: [
      'M18,13H11v2h7Zm-2-3H11v2h5ZM14,7H11V9h3ZM8,21l3-4H9V5H7V17H5Z',
    ],
  },
  descending: {
    size: 24,
    paths: [
      'M18,7H11V9h7Zm-2,3H11v2h5Zm-2,3H11v2h3ZM8,21l3-4H9V5H7V17H5Z',
    ],
  },
};

export default icons;
