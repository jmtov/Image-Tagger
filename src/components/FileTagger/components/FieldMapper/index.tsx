import { FieldMapperField } from './types';

function FieldMapper({ name, type, properties, value, disabled }: FieldMapperField) {
  if (type === 'select') {
    const { options } = properties || {};
    return (
      <select
        name={name}
        key={name}
        value={value}
        id={name}
        className="text-xs"
        disabled={disabled}
      >
        {options.map((option) => (
          <option key={option.id}>{option.title}</option>
        ))}
      </select>
    );
  }
  if (type === 'input') {
    return (
      <input {...properties} className="text-xs" name={name} key={name} value={value} id={name} />
    );
  }
  return null;
}

export default FieldMapper;
