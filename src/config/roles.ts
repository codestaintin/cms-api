const allRoles = {
    user: [],
    admin: ['getUsers', 'manageUsers',
        'getOrganizations', 'manageOrganizations',
        'getBranches','manageBranches'],
};

export const roles: string[] = Object.keys(allRoles);
export const roleRights: Map<string, string[]> = new Map(Object.entries(allRoles));
