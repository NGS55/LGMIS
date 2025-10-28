import { render, screen } from "@testing-library/react";
import ChartCard from "@/app/dashboard/charts/ChartCard";

describe("ChartCard", () => {
  it("renders a chart label", () => {
    render(<ChartCard />);
    expect(screen.getByText(/Sessions/i)).toBeInTheDocument();
  });
});
