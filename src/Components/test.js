import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FetchApi from "./FetchApi";

describe("FetchApi", () => {
  it("renders the start button by default", () => {
    render(<FetchApi />);
    const startButton = screen.getByRole("button", { name: /start/i });
    expect(startButton).toBeInTheDocument();
  });

  it("displays categories after fetching them from the API", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => ({ general: ["General"], history: ["History"] }),
    });

    render(<FetchApi />);
    const startButton = screen.getByRole("button", { name: /start/i });

    fireEvent.click(startButton);

    await waitFor(() => {
      const category1 = screen.getByRole("button", { name: /general/i });
      const category2 = screen.getByRole("button", { name: /history/i });
      expect(category1).toBeInTheDocument();
      expect(category2).toBeInTheDocument();
    });
  });

  it("fetches a question and displays it when a category and difficulty are selected", async () => {
    jest.spyOn(global, "fetch").mockResolvedValueOnce({
      json: async () => ({
        results: [
          {
            category: "General Knowledge",
            type: "multiple",
            difficulty: "easy",
            question: "What is the capital of Portugal?",
            correct_answer: "Lisbon",
            incorrect_answers: ["Madrid", "Barcelona", "Paris"],
          },
        ],
      }),
    });

    render(<FetchApi />);
    const startButton = screen.getByRole("button", { name: /start/i });

    fireEvent.click(startButton);

    const categoryButton = await screen.findByRole("button", {
      name: /general/i,
    });
    fireEvent.click(categoryButton);

    const difficultySelect = screen.getByRole("combobox", {
      name: /difficulty/i,
    });
    fireEvent.change(difficultySelect, { target: { value: "easy" } });

    const regionSelect = screen.getByRole("combobox", { name: /region/i });
    fireEvent.change(regionSelect, { target: { value: "US" } });

    const submitButton = screen.getByRole("button", { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const question = screen.getByText(/what is the capital of portugal/i);
      expect(question).toBeInTheDocument();
    });
  });


});
