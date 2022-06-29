export const attachCompletetdTasksToUsers = (todos) => {
  const parsedData = todos.reduce((acc, curr) => {
    const currentUserId = curr.userId;
    const { completed } = curr;

    const alreadyExists = Boolean(acc.find((user) => user.id === currentUserId));
    if (alreadyExists) {
      const currentValue = acc.find((el) => el.id === currentUserId)?.value || 0;
      const filteredAcc = acc.slice().filter((el) => el.id !== currentUserId);
      return [...filteredAcc, { id: currentUserId, value: completed ? currentValue + 1 : currentValue }];
    }

    return [...acc, { id: curr.userId, value: completed ? 1 : 0 }];
  }, []);

  return parsedData;
};
