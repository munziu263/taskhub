import axios from "axios";
import { useState } from "react";

export default function useProjectsApi() {
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  // Querying location and config
  const BASE_URL: string = "http://localhost:5000";
  const url: (id?: number) => string = (id) =>
    id ? BASE_URL + "/projects/" + id : BASE_URL + "/projects";
  const options = {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };

  const get_all = async () => {
    setIsQuerying(true);
    // Start query
    const response = await axios.get(url());

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const latestProjects: Project[] = await response.data;

    // End query
    setIsQuerying(false);

    return latestProjects;
  };

  const get_by_id = async (id: number) => {
    setIsQuerying(true);
    // Start query
    const response = await axios.get(url(id));

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    // End query
    setIsQuerying(false);

    return await response.data;
  };

  const create = async (name: string) => {
    const payload = { name: name };

    setIsQuerying(true);
    // Start query
    const response = await axios.post(url(), payload, options);

    if (response.status !== 201) {
      throw new Error(response.statusText);
    }

    const createdProject: Project = await response.data;

    // End query
    setIsQuerying(false);

    return createdProject;
  };

  const create_task_in_project = async (name: string, project_id: number) => {
    const payload = { name: name };

    setIsQuerying(true);
    // Start query
    const response = await axios.post(url(project_id), payload, options);

    if (response.status !== 201) {
      throw new Error(response.statusText);
    }

    const createdProject: Project = await response.data;

    // End query
    setIsQuerying(false);

    return createdProject;
  };

  const update = async (id: number, payload: Project) => {
    setIsQuerying(true);
    // Start query
    const response = await axios.put(url(id), payload, options);

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const updatedProject: Project = await response.data;
    // End query
    setIsQuerying(false);

    return updatedProject;
  };

  const remove = async (id: number) => {
    setIsQuerying(true);
    // Start query
    const response = await axios.delete(url(id), options);

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const updatedProjects: Project[] = await response.data;
    // End query
    setIsQuerying(false);

    return updatedProjects;
  };

  const projectsApi: any = {
    get_all,
    get_by_id,
    create,
    create_task_in_project,
    update,
    remove,
  };

  return {
    isQuerying,
    projectsApi,
  };
}
