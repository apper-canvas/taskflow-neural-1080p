const { ApperClient } = window.ApperSDK;

const apperClient = new ApperClient({
  apperProjectId: import.meta.env.VITE_APPER_PROJECT_ID,
  apperPublicKey: import.meta.env.VITE_APPER_PUBLIC_KEY
});

const TABLE_NAME = 'task_c';

export const taskService = {
  getAll: async () => {
    try {
      const params = {
        fields: [
          { field: { Name: "title_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } }
        ],
        orderBy: [{ fieldName: "Id", sorttype: "DESC" }]
      };

      const response = await apperClient.fetchRecords(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data || [];
    } catch (error) {
      console.error("Error fetching tasks:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  getById: async (id) => {
    try {
      const params = {
        fields: [
          { field: { Name: "title_c" } },
          { field: { Name: "completed_c" } },
          { field: { Name: "priority_c" } },
          { field: { Name: "due_date_c" } },
          { field: { Name: "created_at_c" } },
          { field: { Name: "completed_at_c" } }
        ]
      };

      const response = await apperClient.getRecordById(TABLE_NAME, parseInt(id), params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      return response.data;
    } catch (error) {
      console.error(`Error fetching task ${id}:`, error?.response?.data?.message || error.message);
      throw error;
    }
  },

  create: async (taskData) => {
    try {
      const params = {
        records: [
          {
            title_c: taskData.title_c,
            completed_c: taskData.completed_c,
            priority_c: taskData.priority_c,
            due_date_c: taskData.due_date_c || null,
            created_at_c: new Date().toISOString()
          }
        ]
      };

      const response = await apperClient.createRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to create ${failed.length} records: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => {
                throw new Error(`${error.fieldLabel}: ${error}`);
              });
            }
            if (record.message) {
              throw new Error(record.message);
            }
          });
        }

        return successful[0]?.data;
      }
    } catch (error) {
      console.error("Error creating task:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  update: async (id, taskData) => {
    try {
      const updatePayload = {
        Id: parseInt(id)
      };

      if (taskData.title_c !== undefined) updatePayload.title_c = taskData.title_c;
      if (taskData.completed_c !== undefined) updatePayload.completed_c = taskData.completed_c;
      if (taskData.priority_c !== undefined) updatePayload.priority_c = taskData.priority_c;
      if (taskData.due_date_c !== undefined) updatePayload.due_date_c = taskData.due_date_c;
      if (taskData.completed_at_c !== undefined) updatePayload.completed_at_c = taskData.completed_at_c;

      const params = {
        records: [updatePayload]
      };

      const response = await apperClient.updateRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to update ${failed.length} records: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => {
                throw new Error(`${error.fieldLabel}: ${error}`);
              });
            }
            if (record.message) {
              throw new Error(record.message);
            }
          });
        }

        return successful[0]?.data;
      }
    } catch (error) {
      console.error("Error updating task:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  delete: async (id) => {
    try {
      const params = {
        RecordIds: [parseInt(id)]
      };

      const response = await apperClient.deleteRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to delete ${failed.length} records: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.message) {
              throw new Error(record.message);
            }
          });
        }
      }

      return { success: true };
    } catch (error) {
      console.error("Error deleting task:", error?.response?.data?.message || error.message);
      throw error;
    }
  },

  toggleComplete: async (id) => {
    try {
      const currentTask = await taskService.getById(id);
      
      const newCompletedStatus = !currentTask.completed_c;
      const params = {
        records: [
          {
            Id: parseInt(id),
            completed_c: newCompletedStatus,
            completed_at_c: newCompletedStatus ? new Date().toISOString() : null
          }
        ]
      };

      const response = await apperClient.updateRecord(TABLE_NAME, params);

      if (!response.success) {
        console.error(response.message);
        throw new Error(response.message);
      }

      if (response.results) {
        const successful = response.results.filter(r => r.success);
        const failed = response.results.filter(r => !r.success);

        if (failed.length > 0) {
          console.error(`Failed to toggle complete ${failed.length} records: ${JSON.stringify(failed)}`);
          failed.forEach(record => {
            if (record.errors) {
              record.errors.forEach(error => {
                throw new Error(`${error.fieldLabel}: ${error}`);
              });
            }
            if (record.message) {
              throw new Error(record.message);
            }
          });
        }

        return successful[0]?.data;
      }
    } catch (error) {
      console.error("Error toggling task complete:", error?.response?.data?.message || error.message);
      throw error;
    }
  }
};