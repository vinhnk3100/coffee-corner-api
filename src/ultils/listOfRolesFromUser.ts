export const listOfRolesFromUser = async (user): Promise<any> => {
  const listOfRoles = [];

  await user.roles.map((item: { role: any }) => {
    listOfRoles.push(item.role);
  });

  return listOfRoles;
};
