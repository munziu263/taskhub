import axios from "axios";
import { useState } from "react";

export default function useTasksApi() {
  const [isQuerying, setIsQuerying] = useState<boolean>(false);
  // Querying location and config
  const BASE_URL: string = "http://localhost:5000";
  const url: (id?: number) => string = (id) =>
    id ? BASE_URL + "/tasks/" + id : BASE_URL + "/tasks";
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

    const latestTasks = await response.data;
    // End query
    setIsQuerying(false);

    return latestTasks;
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

    const createdTask: Task[] = await response.data;

    // End query
    setIsQuerying(false);

    return createdTask;
  };

  const update = async (id: number, payload: Task) => {
    setIsQuerying(true);
    // Start query
    const response = await axios.put(url(id), payload, options);

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    const updatedTask = await response.data;

    // End query
    setIsQuerying(false);

    return updatedTask;
  };

  const remove = async (id: number) => {
    setIsQuerying(true);
    // Start query
    const response = await axios.delete(url(id), options);

    if (response.status !== 200) {
      throw new Error(response.statusText);
    }

    // The api returns the updated tasks
    const updatedTasks = await response.data;
    // End query
    setIsQuerying(false);

    return updatedTasks;
  };

  const tasksApi: any = {
    get_all,
    get_by_id,
    create,
    update,
    remove,
  };

  return {
    isQuerying,
    tasksApi,
  };
}
