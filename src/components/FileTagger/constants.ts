import { FieldMapperField } from './components/FieldMapper/types';

export const fields: FieldMapperField[] = [
  {
    type: 'select',
    name: 'apartment',
    properties: {
      options: [
        {
          id: '101',
          title: '101',
        },
        {
          id: '102',
          title: '102',
        },
        {
          id: '103',
          title: '103',
        },
      ],
    },
  },
  {
    type: 'select',
    name: 'type',
    properties: {
      options: [
        {
          id: 'schema',
          title: 'Schema',
        },
        {
          id: 'blueprint',
          title: 'Blueprint',
        },
        {
          id: 'view',
          title: 'View',
        },
      ],
    },
  },
  {
    type: 'input',
    name: 'comment',
    properties: {
      type: 'text',
    },
  },
];
