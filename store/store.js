import { create } from "zustand";


const useDrawerStore = create((set) => ({
    drawerState: false,
    toggleDrawer: () => set(state => ({drawerState: !state.drawerState})),

    committeeState: false,
    toggleCommittee: () => set(state => ({committeeState: !state.committeeState})),

    examinerState: false,
    toggleExaminer: () => set(state => ({examinerState: !state.examinerState})),

    teacherState: false,
    toggleTeacher: () => set(state => ({teacherState: !state.teacherState})),
  }))

export default useDrawerStore;