import { useContext, useState, type ChangeEvent, type FormEvent } from "react";
import { ThemeContext } from "../../context";
import { axiosInstance } from "../../utils/apis";
import type { AxiosError } from "axios";
import { enqueueSnackbar } from "notistack";
import { Button } from "@mui/material";
import { styled } from "styled-components";
import { Link } from "react-router-dom";
import { LoadingButton } from "@mui/lab";

const LinkText = styled(Link)`
  text-decoration: none;
  color: white;
`;

export default function BugReportPage() {
  const themes = useContext(ThemeContext);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [severity, setSeverity] = useState("Low");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setDescription(e.target.value);
  };

  const handleSeverityChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setSeverity(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      await axiosInstance.post("/bugs", {
        title,
        description,
        priority: severity.toLowerCase(),
      });
      setIsLoading(false);
      setIsSubmitted(true);
    } catch (err) {
      const error = err as AxiosError;
      enqueueSnackbar(error.message, { variant: "error" });
      setIsLoading(false);
      setIsSubmitted(false);
    }
  };

  return (
    <div className={`container ${themes?.themeMode === "dark" ? "dark" : ""}`}>
      {isSubmitted ? (
        <div
          className="submitted-message"
          style={{
            color: themes?.themeMode === "dark" ? "white" : "black",
          }}
        >
          <h2>Thank you for submitting the bug report!</h2>
          <p>
            We appreciate your contribution. Our team will review the report
            shortly.
          </p>
          <Button
            variant="contained"
            color="primary"
            sx={{
              marginTop: "16px",
            }}
          >
            <LinkText to="/">Go to Homepage</LinkText>
          </Button>
        </div>
      ) : (
        <form className="bug-report-form" onSubmit={handleSubmit}>
          <h2 className="bug-report-title">Submit Bug Report</h2>
          <div className="form-group">
            <label className="bug-label" htmlFor="title">
              Title:
              <input
                className="bug-title"
                type="text"
                id="title"
                value={title}
                onChange={handleTitleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label className="bug-label" htmlFor="description">
              Description:
              <textarea
                className="bug-description"
                id="description"
                value={description}
                onChange={handleDescriptionChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="severity" className="bug-label">
              Severity:
              <select
                className="bug-severity"
                id="severity"
                value={severity}
                onChange={handleSeverityChange}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </label>
          </div>
          <LoadingButton
            type="submit"
            className="submit-button"
            loading={isLoading}
            disabled={isLoading}
            sx={{
              backgroundColor: "#4caf50",
              color: "white",
            }}
          >
            Submit
          </LoadingButton>
        </form>
      )}
    </div>
  );
}
