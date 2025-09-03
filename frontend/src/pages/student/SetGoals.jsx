import React, { useState } from "react";

const SetGoals = () => {
  const [goals, setGoals] = useState([]);
  const [input, setInput] = useState("");

  const addGoal = () => {
    if (input.trim() === "") return;
    setGoals([...goals, { text: input, completed: false }]);
    setInput("");
  };

  const toggleGoal = (index) => {
    const newGoals = [...goals];
    newGoals[index].completed = !newGoals[index].completed;
    setGoals(newGoals);
  };

  const deleteGoal = (index) => {
    setGoals(goals.filter((_, i) => i !== index));
  };

  return (
    <div className="flex flex-col mt-20 gap-5 w-3/4">
      <h2 className="text-2xl font-semibold border-b-2 border-blue-500 pb-2 text-white">
        🎯 Set Your Goals
      </h2>

      {/* Input + Button */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="px-3 py-2 rounded-md w-full focus:outline-none border border-blue-400 text-black"
          placeholder="Enter your goal..."
        />
        <button
          onClick={addGoal}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
        >
          Add
        </button>
      </div>

      {/* Goal List */}
      <ul className="list-disc list-inside mt-4 text-white">
        {goals.length === 0 ? (
          <p className="text-gray-400">No goals yet. Add one above 👆</p>
        ) : (
          goals.map((goal, index) => (
            <li
              key={index}
              className="mb-2 flex justify-between items-center"
            >
              <span
                onClick={() => toggleGoal(index)}
                className={`cursor-pointer ${
                  goal.completed ? "line-through text-gray-400" : ""
                }`}
              >
                {goal.completed ? "✔️" : "🎯"} {goal.text}
              </span>
              <button
                onClick={() => deleteGoal(index)}
                className="text-red-500 hover:text-red-700"
              >
                ❌
              </button>
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default SetGoals;
