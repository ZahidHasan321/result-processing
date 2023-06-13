export const examinerPages = [
  {
    routename: "Home",
    routepath: "/",
  },
  {
    routename: "Pending",
    routepath: "/examiner"
  },
  {
    routename: "History",
    routepath: "/examiner/history"
  }
]

export const courseTeacher = [
  {
    routename: "Home",
    routepath: "/",
  },
  {
    routename: "Pending",
    routepath: "/courseTeacher"
  },
  {
    routename: "History",
    routepath: "/courseTeacher/history"
  }
]


export const committeePages = [
  {
    routename: "Home",
    routepath: "/",
  },
  {
    routename: "Pending",
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
  {
    routename: "Students",
    routepath: "/admin/students",
  },


]



