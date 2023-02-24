export const examinerPages = [
  {
    routename: "Home",
    routepath: "/",
  },
  {
    routename: "Current",
    routepath: "/examiner"
  },
  {
    routename: "History",
    routepath: "/examiner/history"
  }
]


export const committeePages = [
  {
    routename: "Home",
    routepath: "/",
  },
  {
    routename: "Current",
    routepath: "/examCommittee",
  },
  {
    routename: "History",
    routepath: "/examCommittee/history"
  }
]

export const semesterPages = [
  {
    routename: "Home",
    routepath: "/",
  },
  {
    routename: "Dashboard",
    routepath: "/examCommittee/[session]/[semester]",
  },
  {
    routename: "Submitted",
    routepath: "/examCommittee/[session]/[semester]/submitted"
  },
  {
    routename: "Decoded",
    routepath: "/examCommittee/[session]/[semester]/decoded"
  }
]

export const AdminPages = [
  {
    routename: "Home",
    routepath: "/",
  },
  {
    routename: "Exam Committee",
    routepath: "/admin",
  },
  {
    routename: "Teachers",
    routepath: "/admin/teachers",
  },
  {
    routename: "Courses",
    routepath: "/admin/courses",
  },


]



