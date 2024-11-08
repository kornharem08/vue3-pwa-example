import { describe, expect, it, test, vi } from "vitest";
import { getData, sum } from "./sum.js";

test("adds 1 + 2 to equal 3", () => {
  expect(sum(1, 2)).toBe(3);
});

describe("getData", () => {
  it("fetches data and returns the correct data", async () => {
    const mockData = {
      userId: 1,
      id: 1,
      title: "delectus aut autem",
      completed: false,
    };

    // Mock fetch
    vi.stubGlobal(
      "fetch",
      vi.fn().mockResolvedValue({
        json: vi.fn().mockResolvedValue(mockData),
      })
    );

    // Call the function
    const data = await getData();

    // Check if fetch was called
    expect(fetch).toHaveBeenCalledWith(
      "https://jsonplaceholder.typicode.com/todos/1"
    );

    // Check if data was returned correctly
    expect(data).toEqual(mockData);
  });

  it("handles fetch error gracefully", async () => {
    // Mock fetch to simulate an error
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("Fetch error")));

    // Check if error is thrown when calling getData
    await expect(getData()).rejects.toThrowError("Fetch error");

    // Check if error was logged
    const spyConsoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    await expect(getData()).rejects.toThrowError("Fetch error"); // ต้องให้ `getData` โยนข้อผิดพลาด
    expect(spyConsoleError).toHaveBeenCalledWith(
      "Error fetching data:",
      expect.any(Error)
    );
    spyConsoleError.mockRestore();
  });
});
