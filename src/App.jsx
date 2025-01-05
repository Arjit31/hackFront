import React, { useState } from "react";

const App = () => {
  const [selectedOption, setSelectedOption] = useState("static image");
  const [apiResponse, setApiResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (inputValue) => {
    const url =
      "https://your-proxy-service.onrender.com/lf/f7875186-7f9a-4c16-9523-3a93771ab793/api/v1/run/e61d8b0b-5ce6-4d22-ae16-8f84f3162248?stream=false";

    const headers = {
      "Content-Type": "application/json",
      Authorization:
        "Bearer AstraCS:NejzgolyZkkDkmjNaLFpWdiK:f5ffa4243c162225e2f77b5d3cfe45eecc6db651de3c5af3add357990098fd1c",
    };

    const body = {
      input_value: inputValue,
      output_type: "chat",
      input_type: "chat",
      tweaks: {
        "ChatInput-qOJjD": {},
        "ParseData-y4vGO": {},
        "Prompt-RSl44": {},
        "SplitText-7kLpe": {},
        "ChatOutput-c13sB": {},
        "AstraDB-2Qw1x": {},
        "AstraDB-kgj42": {},
        "File-U0S57": {},
        "GoogleGenerativeAIModel-K1NBQ": {},
        "Google Generative AI Embeddings-rAYWY": {},
        "Google Generative AI Embeddings-dhUpS": {},
      },
    };

    try {
      setLoading(true);
      setError("");
      setApiResponse("");

      const response = await fetch(url, {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        throw new Error(
          `HTTP error! Status: ${response.status}, Details: ${errorDetails}`
        );
      }

      const data = await response.json();
      const result = data.outputs[0].outputs[0].results.message.text;
      // console.log(result);
      setApiResponse(result);
    } catch (error) {
      console.log(error)
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    fetchData(selectedValue);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>API Request Dropdown</h1>
      <label htmlFor="options">Choose an option:</label>
      <select
        id="options"
        value={selectedOption}
        onChange={handleOptionChange}
        style={{ marginLeft: "10px", padding: "5px" }}
      >
        <option value="static image">Static Image</option>
        <option value="carousel">Carousel</option>
        <option value="reel">Reel</option>
      </select>

      <div style={{ marginTop: "20px" }}>
        {loading && <p>Loading...</p>}
        {error && <p style={{ color: "red" }}>Error: {error}</p>}
        {apiResponse && <p>Response: {apiResponse}</p>}
      </div>
    </div>
  );
};

export default App;
