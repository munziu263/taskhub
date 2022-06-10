import axios from "axios";
import { useState } from "react";

export default function useProjectsApi() {
  const [projects, setProjects] = useState<Project[]>([]);
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

    const responseData = await response.data;
    setProjects(responseData);

    // End query
    setIsQuerying(false);
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

    const responseData = await response.data;

    get_all();
    // End query
    setIsQuerying(false);
  };

  const update = async (id: number, payload: Project) => {
    setIsQuerying(true);
    // Start query
    const response = await axios.put(url(id), payload, options);

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const responseData = await response.data;
    get_all();
    // End query
    setIsQuerying(false);
  };

  const remove = async (id: number) => {
    setIsQuerying(true);
    // Start query
    const response = await axios.delete(url(id), options);

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const responseData = await response.data;
    get_all();
    // End query
    setIsQuerying(false);
  };

  const projectsApi: any = {
    get_all,
    get_by_id,
    create,
    update,
    remove,
  };

  return {
    projects,
    isQuerying,
    projectsApi,
  };
}
