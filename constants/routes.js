export const examinerPages = [
  {
    routename: "Home",
    routepath: "/",
  },
    {
        routename: "Dashboard",
        routepath: "/examiner"
      },
    {
      routename: "Current",
      routepath: "/examiner/current"
    },
    {
      routename: "History",
      routepath: "/examiner/history"
    }
  ]


  export const committeePages = [
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
  
      
  ]



  