import express from "express";
import db from "./config/database.config";
import logger from "./config/logger.config";
import cors from "cors";
import morganMiddleware from "./middlewares/morgan.middleware";
import Task from "./models/Task";

class Server {
  constructor() {
    this.app = express();
    this.server();
    this.routes();
  }

  routes() {
    // HTTP data to json
    this.app.use(express.json());
    this.app.use(cors());

    // HTTP request logger
    this.app.use(morganMiddleware);

    // HTTP requests

    /**
     * Desc: Get all tasks
     * Method: GET
     * Access: Public
     */
    this.app.get("/api/tasks", async (req, res) => {
      try {
        // Get tasks
        const tasks = await Task.find({});
        logger.info("Tasks Retrieved!");
        return res.json({ status: "ok", tasks });
      } catch (error) {
        logger.error(error.message);
        return res.json({ status: "failed", message: "Server crashed" });
      }
    });

    /**
     * Desc: Add a new task
     * Method: POST
     * Access: Public
     */
    this.app.post("/api/tasks", async (req, res) => {
      // Get body data
      const { name } = req.body;

      try {
        // Add a task
        const task = await Task.create({ name });
        logger.info("Task created!");
        return res.json({ status: "ok", task });
      } catch (error) {
        logger.error(error.message);
        return res.json({ status: "failed", message: "Server crashed" });
      }
    });

    /**
     * Desc: Get a task by id
     * Method: GET
     * Access: Public
     */
    this.app.get("/api/tasks/:taskId", async (req, res) => {
      // Get task id
      const { taskId } = req.params;
      logger.info(taskId);

      try {
        // Get task by id
        const task = await Task.findById(taskId);
        logger.info(`Task ${taskId} Retrieved!`);
        return res.json({ status: "ok", task });
      } catch (error) {
        logger.error(error.message);
        return res.json({ status: "failed", message: "Server crashed" });
      }
    });

    /**
     * Desc: Update a task by id
     * Method: PUT
     * Access: Public
     */
    this.app.put("/api/tasks/:taskId", async (req, res) => {
      // Get task id
      const { taskId } = req.params;

      // Get body data
      const { name } = req.body;
      try {
        // Update task by Id
        const updatedTask = await Task.findByIdAndUpdate(
          taskId,
          { name },
          { new: true }
        );

        if (!updatedTask) {
          logger.error(`Task ${taskId} not found`);
          return res.json({
            status: "failed",
            message: `Task ${taskId} not found`,
          });
        }

        logger.info(`Task ${taskId} updated successfully`);
        return res.json({ status: "ok", task: updatedTask });
      } catch (error) {
        logger.error(error.message);
        return res.json({ status: "failed", message: "Server crashed" });
      }
    });

    /**
     * Desc: Delete a task by id
     * Method: DELETE
     * Access: Public
     */
    this.app.delete("/api/tasks/:taskId", async (req, res) => {
      try {
        // Get body data
        const { taskId } = req.params;

        // Delete task
        const deletedTask = await Task.findByIdAndDelete(taskId);
        logger.info("Task deleted!");
        return res.json({ status: "ok", task: deletedTask });
      } catch (error) {
        logger.error(error.message);
        return res.json({ status: "failed", message: "Server crashed" });
      }
    });
  }

  async server() {
    db()
      .then(() => {
        this.app.listen(3001, () => {
          logger.info("Server is running on port 3001");
        });
      })
      .catch((error) => logger.info(error.message));
  }
}

export default new Server();
