import { CoursePart } from '../App';

const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

const Part = ({ part }: { part: CoursePart }) => {
  const displayParts = () => {
    switch (part.kind) {
      case 'basic':
        return (
          <div>
            <h3>
              {part.name} - {part.exerciseCount}
            </h3>
            <p>
              <em>{part.description}</em>
            </p>
          </div>
        );
      case 'background':
        return (
          <div>
            <h3>
              {part.name} - {part.exerciseCount}
            </h3>
            <p>
              <em>{part.description}</em>
            </p>
            <p>{part.backgroundMaterial}</p>
          </div>
        );
      case 'group':
        return (
          <div>
            <h3>
              {part.name} - {part.exerciseCount}
            </h3>
            <p>project exercise {part.groupProjectCount}</p>
          </div>
        );
      case 'special':
        return (
          <div>
            <h3>
              {part.name} - {part.exerciseCount}
            </h3>
            <p>
              <em>{part.description}</em>
            </p>
            <p>required skills: {part.requirements.join(', ')}</p>
          </div>
        );
      default:
        return assertNever(part);
    }
  };

  return displayParts();
};

export default Part;
