import { render, screen } from "@testing-library/react";
import NotificationsPage from "./NotificationsPage";
import { describe, it, expect, vi } from "vitest";

// Mock the API and Router
vi.mock("../../../lib/axios", () => ({
  default: {
    get: vi.fn().mockResolvedValue({ data: [] }),
    patch: vi.fn(),
  },
}));

describe("NotificationsPage", () => {
  it("should render the notifications header", () => {
    render(<NotificationsPage />);
    expect(screen.getByText("Notifications")).toBeInTheDocument();
  });
});
