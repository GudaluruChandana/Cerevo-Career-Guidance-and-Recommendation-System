import { useState } from "react";

export default function InterestTags({ interests, setInterests }) {
  const [input, setInput] = useState("");

  const addInterest = () => {
    if (input.trim() && !interests.includes(input.trim())) {
      setInterests([...interests, input.trim()]);
      setInput("");
    }
  };

  const removeInterest = (interest) => {
    setInterests(interests.filter(i => i !== interest));
  };

  return (
    <div>
      <h3>Your Interests</h3>

      <div className="tag-box">
        {interests.map((interest, index) => (
          <span key={index} className="tag">
            {interest}
            <button onClick={() => removeInterest(interest)}>×</button>
          </span>
        ))}
      </div>

      <input
        placeholder="Type interest and press Add"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />

      <button onClick={addInterest}>Add</button>
    </div>
  );
}
