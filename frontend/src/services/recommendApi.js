import axios from "axios";

export const getCareer10thRecommendation = async (formData) => {
  const payload = {
    stage: "10th",
    marks: Number(formData.marks),
    interests: formData.interests.split(",").map(i => i.trim()),
    location: formData.location,
    budget: formData.budget ? Number(formData.budget) : null,
    ambition: formData.ambition,
    top_n: 3
  };

  const response = await axios.post("http://127.0.0.1:8000/recommend", payload);
  return response.data;
};
