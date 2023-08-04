const allRoles = {
    user: [],
    admin: ['getUsers', 'manageUsers', 'getOrganizations', 'manageOrganizations'],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
