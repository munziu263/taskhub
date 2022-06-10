import { renderHook } from "@testing-library/react";
import useProjectsApi from "./useProjectsApi";

describe("My Projects API", () => {
  it("it can create a new project", () => {
    const { result } = renderHook(() => useProjectsApi());

    const { projectsApi } = result.current;
    console.log(result.current);
    const newProjectName = "Test Project 1";
    const { create } = projectsApi;
    const response = create(newProjectName);

    expect(response instanceof Promise).toBe(true);
  });
});
