type Course = {
  name: string;
  exerciseCount: number;
};

const Content = ({ courses }: { courses: Course[] }) => {
  return (
    <ul>
      {courses.map(({ name, exerciseCount }) => (
        <li key={name}>
          {name} - {exerciseCount}
        </li>
      ))}
    </ul>
  );
};

export default Content;
