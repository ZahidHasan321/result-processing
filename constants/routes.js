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
    },
  ]

  export const semesterPages = [
    {
      routename: "Home",
      routepath: "/",
    },
    {
        routename: "Dashboard",
        routepath: "/examCommittee/[session]/[semester]/dashboard",
      },
    {
      routename: "Current",
      routepath: "/examCommittee/[session]/[semester]/current"
    },
    {
      routename: "History",
      routepath: "/examCommittee/[session]/[semester]/history"
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



  