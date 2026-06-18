import { create } from "zustand";

export const useSelectedUsersStore = create((set) => ({
  selectedUsers: [],

  addUser: (user) =>
    set((state) => ({
      selectedUsers: [...state.selectedUsers, user],
    })),

  removeUser: (userId) =>
    set((state) => ({
      selectedUsers: state.selectedUsers.filter(
        (u) => u.id !== userId
      ),
    })),

  clearUsers: () =>
    set({
      selectedUsers: [],
    }),
}));