import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SkillBars } from "@/components/skill-bars";

describe("SkillBars", () => {
  const mockSkills = [
    { name: "React", level: 90 },
    { name: "TypeScript", level: 85 },
  ];

  it("renders skill bars with correct names", () => {
    render(<SkillBars skills={mockSkills} />);
    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
  });

  it("renders skill bars with correct levels", () => {
    render(<SkillBars skills={mockSkills} />);
    expect(screen.getByText("90%")).toBeInTheDocument();
    expect(screen.getByText("85%")).toBeInTheDocument();
  });

  it("has proper accessibility attributes", () => {
    render(<SkillBars skills={mockSkills} />);
    const progressBars = screen.getAllByRole("progressbar");
    expect(progressBars).toHaveLength(2);
    expect(progressBars[0]).toHaveAttribute("aria-valuemax", "100");
    expect(progressBars[0]).toHaveAttribute("aria-valuemin", "0");
  });
});
