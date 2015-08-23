export const taskStatusFilter = ['taskStatus', (taskStatus) => {

  return (taskList, status) => {
    if (!status || !taskStatus.VALID[status]) return taskList;

    const completed = status === taskStatus.COMPLETED;

    return taskList.filter((task) => {
      return task.completed === completed;
    });
  };

}];
