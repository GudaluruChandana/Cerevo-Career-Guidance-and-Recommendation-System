import { getCareer10thRecommendation } from "../services/recommendApi";
import { useNavigate } from "react-router-dom";

const navigate = useNavigate();

const handleSubmit = async () => {
  try {
    const data = await getCareer10thRecommendation(formData);

    localStorage.setItem("career10thResult", JSON.stringify(data));
    navigate("/career-after-10th/results");

  } catch (err) {
    alert("AI Server not responding. Please try again.");
    console.log(err);
  }
};
