import { CoursePart } from '../App';
import Part from './Part';

const Content = ({ courses }: { courses: CoursePart[] }) => {
  return (
    <div>
      {courses.map((part, index) => (
        <Part key={index} part={part} />
      ))}
    </div>
  );
};

export default Content;
