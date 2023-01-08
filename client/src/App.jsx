import Heading from "./components/Heading";
import Todo from "./components/Todo";

export default function App() {
  return (
    <div className="mt-[100px]">
      {/* Container */}
      <div className="mx-auto max-w-[500px] px-4">
        {/* Layout */}
        <div className="flex flex-col gap-4">
          {/* Heading */}
          <Heading />

          {/* Todo */}
          <Todo />
        </div>
      </div>
    </div>
  );
}
