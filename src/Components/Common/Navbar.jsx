import React, { useState } from "react";

function CloudConvertComponent() {
  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [pdfUrl, setPdfUrl] = useState("");

  const handleConvert = async () => {
    setStatus("loading");

    try {
      const response = await fetch(
        `https://api.cloudconvert.com/v2/convert/formats?filter[input_format]=pdf&include=options`,
        {
          method: "POST",
          mode: "no-cors",
          headers: {
            "Content-Type": "application/json",
            // Add your CloudConvert API key here
            Authorization:
              "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiNDczYzZmNzllYWM2ODNlMjRlZDZkMGRiMWY3Y2RhMDk5OThhYTM2MGM1MWQ0OThjOGZkMTQwZGFhN2UxMjVmNDdkMzM3NmYzMTQxYmM2ZmYiLCJpYXQiOjE3MTIyMzI4MzYuMTMxMjc4LCJuYmYiOjE3MTIyMzI4MzYuMTMxMjgsImV4cCI6NDg2NzkwNjQzNi4xMjYxMDMsInN1YiI6IjY3ODQ0MTc3Iiwic2NvcGVzIjpbInVzZXIucmVhZCIsInVzZXIud3JpdGUiLCJ0YXNrLnJlYWQiLCJ0YXNrLndyaXRlIiwid2ViaG9vay5yZWFkIiwid2ViaG9vay53cml0ZSIsInByZXNldC5yZWFkIiwicHJlc2V0LndyaXRlIl19.Jwp5QXXm1MIiPBjuBKTlBM0rjbmPqcB2ghR1wOSr47Urq95QcYzpPwZi2zroLwZTJErcn1X8tcdK2ZyHHTyrDhsP_2crK3iKcwHkN84onML9xAtTYFH-A_b0W0kkukkUNsQMyEDfsg5qyYtEMGa3XzjmimbkBmWk2y9KssRh47ocd5wRiInFP4fPKLxBpqETW1WEc1WAoe18SNHoqul6PeOWL7KEp3cFX_8kLfzb-K4SnvnV9gjnL1cyrAlInXJqzpcV_Jg0tqH4ItLTvLdb4aM8HKoqpuEq9BcKUmkXb8l9Kr-wVKgQMgEmrLyQZjqbRynYsafFzgFdUYqKtKNWJzkWw0D12zHclHdVCeStq5e9HxiL4AqJJi8ScamgqhURQvL6Cq2wURmhewzDBBdmWAB-cpyt9rIY6jhYjFT8fQoaoNtliuOam_sd31Io9JaYmkHAn-zUD7aGl-Mo2WWY8MSjmj4EfWxKWm-ypKKtrvqFPfqWTF4wY8XBhAAuYU3Y3POHYOvtosyW2I2yEFZQa-ShSqwqht94pezyXXaiy9A3p9TZaSPkFsm48xXk08FGSTF8xpnrx2kfzQHdnTXDV68bgVLT_x_tzMnEimYBVQzdfeyTgZHXrn9xZL2cix2JyYM2A__6Htw3cNui",
          },
          body: JSON.stringify({
            tasks: {
              "import-my-file": {
                operation: "import/url",
                url: `${process.env.PUBLIC_URL}/Asset/Docx/Interview qns.docx`,
              },
              "convert-my-file": {
                operation: "convert",
                input: "import-my-file",
                output_format: "pdf",
              },
              "export-my-file": {
                operation: "export/url",
                input: "convert-my-file",
              },
            },
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to convert file");
      }

      const data = await response.json();
      setPdfUrl(data.tasks["export-my-file"].result.files[0].url);
      setStatus("success");
    } catch (error) {
      setErrorMessage(error.message);
      setStatus("error");
    }
  };

  return (
    <div>
      {status === "loading" && <p>Loading...</p>}
      {status === "success" && (
        <a href={pdfUrl} target="_blank" rel="noopener noreferrer">
          Download PDF
        </a>
      )}
      {status === "error" && <p>Error: {errorMessage}</p>}
      {status === "idle" && (
        <button onClick={handleConvert}>Convert to PDF</button>
      )}
    </div>
  );
}

export default CloudConvertComponent;
